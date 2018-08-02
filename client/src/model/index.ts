import * as m from 'metarpheus/model-ts';

export type Year = '2015' | '2016' | '2017' | '2018';
export type Month =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12';

export type Cost = m.Cost;

export const Cost = m.Cost;

export type Budget = m.Budget;

export const Budget = m.Budget;

import { HistoryLocation } from '@buildo/bento/data';

export { HistoryLocation };

export type CurrentView =
  | { view: 'budgets' }
  | { view: 'budget-details'; id: m.UUID };

const budgetDetailsMatch = /^\/budget-details\/([^\/]+)$/;

export function locationToView(location: HistoryLocation): CurrentView {
  const budgetDetailMatched = location.pathname.match(budgetDetailsMatch);

  if (budgetDetailMatched) {
    return { view: 'budget-details', id: budgetDetailMatched[1] };
  }

  return { view: 'budgets' };
}

export function viewToLocation(view: CurrentView): HistoryLocation {
  switch (view.view) {
    case 'budget-details':
      return { pathname: `/budget-details/${view.id}`, search: {} };
    default:
      return { pathname: '/', search: {} };
  }
}
