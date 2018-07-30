package billing.repository

import java.util.UUID
import scala.collection.concurrent.TrieMap

import billing.model.{Budget, Cost}

trait BudgetRepository {
  def updateBudget(uuid: UUID, budget: Budget): UUID
  def addBudgetCost(cost: Cost, budgetUuid: UUID): Option[UUID]
  def saveBudget(budget: Budget): UUID
  def getBudgets(): Map[UUID, Budget]
}

class BudgetRepositoryImpl() extends BudgetRepository {
  private val budgetList: TrieMap[UUID, Budget] = TrieMap.empty

  override def saveBudget(budget: Budget): UUID = {
    val uuid = UUID.randomUUID
    budgetList.put(uuid, budget)
    uuid
  }

  // FIXME: right now costs are handled as updates to Budget, later they should live separately in their own controller
  override def updateBudget(uuid: UUID, budget: Budget): UUID = {
    budgetList.update(uuid, budget)
    uuid
  }

  override def getBudgets(): Map[UUID, Budget] = {
    budgetList.toMap[UUID, Budget]
  }

  override def addBudgetCost(cost: Cost, budgetUuid: UUID) = {
    budgetList
      .get(budgetUuid)
      .map(budget => {
        val updatedBudget = budget.copy(costs = cost :: budget.costs)
        budgetList.update(budgetUuid, updatedBudget)
        budgetUuid
      })
  }
}
