package billing.controller

import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}

import billing.model.{Budget, Cost}
import billing.service.{BudgetService}
import billing.repository.{BudgetRepository}

import wiro.annotation._

@path("billing")
trait BudgetApi {
  @query
  def getBudgets(): Future[Either[Throwable, Map[UUID, Budget]]]

  @command
  def saveBudget(
      budget: Budget
  ): Future[Either[Throwable, UUID]]

  @command
  def updateBudget(
      uuid: UUID,
      budget: Budget
  ): Future[Either[Throwable, UUID]]

  @command
  def addBudgetCost(
      budgetUuid: UUID,
      cost: Cost
  ): Future[Either[Throwable, UUID]]
}

class BudgetApiImpl(
    service: BudgetService
)(
    implicit ec: ExecutionContext
) extends BudgetApi {
  override def getBudgets(): Future[Either[Throwable, Map[UUID, Budget]]] =
    Future {
      Right(service.getBudgets)
    }

  override def saveBudget(budget: Budget): Future[Either[Throwable, UUID]] =
    Future {
      Right(service.saveBudget(budget))
    }

  override def updateBudget(
      uuid: UUID,
      budget: Budget
  ): Future[Either[Throwable, UUID]] =
    Future {
      Right(service.updateBudget(budget = budget, uuid = uuid))
    }

  override def addBudgetCost(budgetUuid: UUID,
                             cost: Cost): Future[Either[Throwable, UUID]] =
    Future {
      service.addBudgetCost(budgetUuid = budgetUuid, cost = cost) match {
        case Some(uuid: UUID) => Right(uuid)
        case None             => Left(None.orNull)
      }
    }
}
