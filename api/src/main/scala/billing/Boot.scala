package billing

import scala.io.StdIn

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import akka.http.scaladsl.Http
import akka.http.scaladsl.server._
import akka.http.scaladsl.model._
import de.heikoseeberger.akkahttpcirce.ErrorAccumulatingCirceSupport._
import io.circe.generic.auto._
import io.buildo.enumero.circe._

import wiro.Config
import wiro.server.akkaHttp._

import Directives._
import StatusCodes._
import model._
import FailSupport._

import billing.controller.{BudgetApi, BudgetApiImpl}
import billing.service.{BudgetServiceImpl}
import billing.repository.{BudgetRepositoryImpl}

object Boot extends App with RouterDerivationModule {
  implicit def throwableResponse: ToHttpResponse[Throwable] = null
  implicit val system = ActorSystem("my-system")
  implicit val materializer = ActorMaterializer()
  implicit val executionContext = system.dispatcher

  val budgetRepository = new BudgetRepositoryImpl
  val budgetService = new BudgetServiceImpl(budgetRepository)

  val budgetRouter = deriveRouter[BudgetApi](new BudgetApiImpl(budgetService))

  val rpcServer = new HttpRPCServer(
    config = Config("localhost", 8080),
    routers = List(budgetRouter)
  )
}
