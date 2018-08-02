package billing.repository

import java.util.UUID
import scala.concurrent.duration.Duration
import scala.collection.concurrent.TrieMap
import scala.concurrent.{Await, ExecutionContext, Awaitable}
import io.getquill._
import io.circe.{Printer, Encoder, Decoder, Json}
import io.circe.syntax._
import io.circe.parser.decode
import io.circe.generic.auto._

import billing.model.{Budget, Cost}
import billing.utils.{DateTime}

import DateTime._

trait Decoders {
  implicit val decodeSubmissionData: MappedEncoding[String, Seq[Cost]] =
    MappedEncoding(decode[Seq[Cost]](_).fold(err => Seq.empty[Cost], v => v))
}

trait Encoders {
  private val jsonPrinter = Printer.noSpaces.copy(dropNullValues = true)
  implicit val encodeCost: MappedEncoding[Seq[Cost], String] = MappedEncoding(
    _.asJson.pretty(jsonPrinter))
}

trait BudgetRepository {
  def addBudgetCost(cost: Cost, budgetUuid: UUID): Awaitable[UUID]
  def modifyBudgetCost(cost: Cost, budgetUuid: UUID): Awaitable[UUID]
  def saveBudget(budget: Budget): Awaitable[UUID]
  def getBudgets(): Awaitable[List[billing.model.Budget]]
}

class BudgetRepositoryImpl(
    implicit ec: ExecutionContext
) extends BudgetRepository {
  private val ctx =
    new PostgresAsyncContext(NamingStrategy(LowerCase, PostgresEscape), "db")
    with Encoders with Decoders

  import ctx._

  implicit private val budgetsSchemaMeta = schemaMeta[Budget]("budgets")

  private val budgetList: TrieMap[UUID, Budget] = TrieMap.empty

  override def saveBudget(budget: Budget): Awaitable[UUID] = {
    val uuid = UUID.randomUUID.toString()
    val now = Some(getDateString)
    val completeBudget =
      budget.copy(uuid = Some(uuid), creationDate = now, lastUpdate = now)

    val insert = quote {
      query[Budget].insert(lift(completeBudget))
    }

    ctx.run(insert).map(_ => UUID.fromString(uuid))
  }

  override def getBudgets(): Awaitable[List[billing.model.Budget]] = {
    val select = quote {
      query[Budget]
    }

    ctx.run(select)
  }

  override def addBudgetCost(cost: Cost, budgetUuid: UUID): Awaitable[UUID] = {
    val now = Some(getDateString)
    val myCost = cost.copy(uuid = Some(UUID.randomUUID))
    val stringUuid = budgetUuid.toString
    val selectBudget = quote {
      query[Budget].filter(_.uuid.getOrElse("") == lift(stringUuid))
    }
    for {
      budget <- ctx.run(selectBudget)
      updatedCosts: Seq[Cost] = budget.headOption
        .map(_.costs)
        .getOrElse(Seq.empty) ++ Seq(myCost)
      _ <- ctx.run(quote {
        query[Budget]
          .filter(_.uuid.getOrElse("") == lift(stringUuid))
          .update(_.costs -> lift(updatedCosts), _.lastUpdate -> lift(now: Option[String]))
      })
    } yield budgetUuid
  }

  override def modifyBudgetCost(cost: Cost, budgetUuid: UUID): Awaitable[UUID] = {
    val now = Some(getDateString)
    val stringUuid = budgetUuid.toString
    val selectBudget = quote {
      query[Budget].filter(_.uuid.getOrElse("") == lift(stringUuid))
    }
    for {
      budget <- ctx.run(selectBudget)
      updatedCosts: Seq[Cost] = budget.headOption
        .map(_.costs)
        .getOrElse(Seq.empty)
        .filter(_.uuid != cost.uuid) ++ Seq(cost)
      _ <- ctx.run(quote {
        query[Budget]
          .filter(_.uuid.getOrElse("") == lift(stringUuid))
          .update(_.costs -> lift(updatedCosts), _.lastUpdate -> lift(now: Option[String]))
      })
    } yield budgetUuid
  }
}
