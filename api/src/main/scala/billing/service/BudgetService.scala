package billing.service

import java.util.UUID
import scala.concurrent.{Await, Awaitable}
import scala.concurrent.duration.Duration

import billing.model.{Budget, Cost}
import billing.repository.{BudgetRepository}

trait BudgetService {
  def getBudgets(): List[Budget];
  def saveBudget(budget: Budget): UUID;
  def addBudgetCost(cost: Cost, budgetUuid: UUID): UUID
  def modifyBudgetCost(cost: Cost, budgetUuid: UUID): UUID
}

class BudgetServiceImpl(repo: BudgetRepository) extends BudgetService {
  override def getBudgets(): List[Budget] = {
    Await.result(repo.getBudgets(), Duration.Inf)
  }

  override def saveBudget(budget: Budget): UUID = {
    Await.result(repo.saveBudget(budget), Duration.Inf)
  }

  override def addBudgetCost(cost: Cost, uuid: UUID): UUID = {
    Await.result(repo.addBudgetCost(budgetUuid = uuid, cost = cost),
                 Duration.Inf)
  }

  override def modifyBudgetCost(cost: Cost, uuid: UUID): UUID = {
    Await.result(repo.modifyBudgetCost(budgetUuid = uuid, cost = cost),
                 Duration.Inf)
  }
}
