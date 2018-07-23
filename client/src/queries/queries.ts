import { Query, available, location } from '@buildo/bento/data';
import * as API from 'API';
import { locationToView } from 'model';

export { location };

export const currentView = Query({
  params: {},
  dependencies: { location },
  fetch: ({ location }) => Promise.resolve(locationToView(location)),
});

export const budgets = Query({
  cacheStrategy: available,
  params: {},
  fetch: () =>
    API.metaRoutes.budgetApi_getBudgets().catch(error => ({
      error,
    })),
});
