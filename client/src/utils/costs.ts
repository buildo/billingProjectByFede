import { Cost, Budget } from 'model';

export const addCommas = (nStr: string): string => {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

export const getCostValue = (cost: Cost) =>
  cost.value
    ? parseFloat(cost.value)
    : cost.days && cost.pricePerDay
      ? parseFloat(cost.days) * parseFloat(cost.pricePerDay)
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
