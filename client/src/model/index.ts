import * as metarpheusModels from 'metarpheus/model-ts';

export type Budget = metarpheusModels.Budget;

export const Budget = metarpheusModels.Budget;

import { HistoryLocation } from '@buildo/bento/data';

export { HistoryLocation };

export type CurrentView = 'budgets' | 'costs';

export function locationToView(location: HistoryLocation): CurrentView {
  switch (location.pathname) {
    case '/costs':
      return 'costs';
    default:
      return 'budgets';
  }
}

export function viewToLocation(view: CurrentView): HistoryLocation {
  switch (view) {
    case 'costs':
      return { pathname: '/costs', search: {} };
    default:
      return { pathname: '/', search: {} };
  }
}
