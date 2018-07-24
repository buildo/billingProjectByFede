import { Command } from '@buildo/bento/data';
import { budgets } from 'queries';
import * as API from 'API';
import { Budget } from 'model';

export const createBudget = Command({
  params: { budget: Budget },
  invalidates: { budgets },
  run: budget =>
    API.metaRoutes.budgetApi_saveBudget(budget).catch(error => ({
      error,
    })),
});
