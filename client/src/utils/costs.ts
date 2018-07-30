import { Cost, Budget } from 'model';

export const getCostValue = (cost: Cost) =>
  cost.value
    ? parseInt(cost.value, 10)
    : cost.days && cost.pricePerDay
      ? parseInt(cost.days, 10) * parseInt(cost.pricePerDay, 10)
      : 0;

export const getBudgetConsumed = (budget: Budget): number =>
  budget.costs.reduce((acc, c) => acc + getCostValue(c), 0);

export const getBudgetConsumedPercentage = (budget: Budget): number =>
  !budget.value
    ? 0
    : Math.round(
        (getBudgetConsumed(budget) * 10000) /
          (budget.value ? parseInt(budget.value, 10) : 0),
      ) / 100;
