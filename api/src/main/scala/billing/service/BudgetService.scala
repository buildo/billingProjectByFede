package billing.service

import java.util.UUID

import billing.model.{Budget}
import billing.repository.{BudgetRepository}

trait BudgetService {
  def getBudgets(): Map[UUID, Budget];
  def saveBudget(budget: Budget): UUID;
  def updateBudget(budget: Budget, uuid: UUID): UUID;
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
}
