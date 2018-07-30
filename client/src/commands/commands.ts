import { Command, doUpdateLocation } from '@buildo/bento/data';
import * as t from 'io-ts';
import { budgets } from 'queries';
import * as API from 'API';
import { Budget, Cost } from 'model';

export { doUpdateLocation };

export const createBudget = Command({
  params: { budget: Budget },
  invalidates: { budgets },
  run: budget =>
    API.metaRoutes.budgetApi_saveBudget(budget).catch(error => ({
      error,
    })),
});

export const addCost = Command({
  params: { cost: Cost, budgetUuid: t.string },
  invalidates: { budgets },
  run: ({ cost, budgetUuid }) =>
    API.metaRoutes.budgetApi_addBudgetCost({ cost, budgetUuid }),
});
