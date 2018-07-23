import * as React from 'react';
import { declareQueries } from '@buildo/bento/data';
import { budgets } from 'queries';

const queries = declareQueries({ budgets });

const Budgets: React.SFC<typeof queries.Props> = ({ budgets }) => (
  <div>{JSON.stringify(budgets)}</div>
);

export default queries(Budgets);
