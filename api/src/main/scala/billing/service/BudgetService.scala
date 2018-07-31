package billing.service

import java.util.UUID

import billing.model.{Budget, Cost}
import billing.repository.{BudgetRepository}

trait BudgetService {
  def getBudgets(): Map[UUID, Budget];
  def saveBudget(budget: Budget): UUID;
  def updateBudget(budget: Budget, uuid: UUID): UUID;
  def addBudgetCost(cost: Cost, budgetUuid: UUID): Option[UUID]
  def modifyBudgetCost(cost: Cost, budgetUuid: UUID): Option[UUID]
}

class BudgetServiceImpl(repo: BudgetRepository) extends BudgetService {
  override def getBudgets(): Map[UUID, Budget] = {
    repo.getBudgets()
  }

  override def saveBudget(budget: Budget): UUID = {
    repo.saveBudget(budget)
  }

  override def updateBudget(budget: Budget, uuid: UUID): UUID = {
    repo.updateBudget(uuid = uuid, budget = budget)
  }

  override def addBudgetCost(cost: Cost, uuid: UUID): Option[UUID] = {
    repo.addBudgetCost(budgetUuid = uuid, cost = cost)
  }

  override def modifyBudgetCost(cost: Cost, uuid: UUID): Option[UUID] = {
    repo.modifyBudgetCost(budgetUuid = uuid, cost = cost)
  }
}
