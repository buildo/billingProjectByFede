import * as React from 'react';
import { Option, none, some } from 'fp-ts/lib/Option';
import { declareQueries, declareCommands } from '@buildo/bento/data';
import { budgets, currentView } from 'queries';
import { Budget, viewToLocation } from 'model';
import { doUpdateLocation } from 'commands';
import { getBudgetConsumed, getBudgetConsumedPercentage } from 'utils/costs';
import CostAdder from 'CostAdder';
import GoBackIcon from 'GoBackIcon';
import View from 'View';
import CostsTable from './CostsTable';

import './budget.scss';

const queries = declareQueries({ budgets, currentView });
const commands = declareCommands({ doUpdateLocation });

type Props = typeof queries.Props & typeof commands.Props;
type State = {};

class BudgetComponent extends React.PureComponent<Props, State> {
  goBack = () => {
    const { doUpdateLocation } = this.props;

    doUpdateLocation(viewToLocation({ view: 'budgets' }));
  };

  getBudget = (): Option<Budget> => {
    const { currentView, budgets } = this.props;

    return currentView.ready &&
      budgets.ready &&
      !currentView.loading &&
      currentView.value.view === 'budget-details'
      ? some({
          ...budgets.value[currentView.value.id],
          id: currentView.value.id,
        })
      : none;
  };

  render() {
    return this.getBudget().fold(null, (budget: Budget & { id: string }) => (
      <View column className="budget" hAlignContent="center">
        <View column className="goBackIcon" grow={1}>
          <GoBackIcon onClick={this.goBack} />
        </View>

        <View column>
          <h1>
            details for budget <strong>{budget.title}</strong>
          </h1>
        </View>

        <View style={{ width: '100%' }} grow={1}>
          <View column grow={1}>
            <h3>value:</h3>
            <div>{budget.value ? `${budget.value}€` : '--'}</div>
          </View>

          <View column grow={1}>
            <h3>costs:</h3>
            <div>{`${getBudgetConsumed(budget)}€`}</div>
          </View>

          <View column grow={1}>
            <h3>% completed:</h3>
            <div>{`${getBudgetConsumedPercentage(budget)}%`}</div>
          </View>
        </View>

        <View style={{ width: '100%' }} column grow={1}>
          <h3>notes:</h3>
          <div>{budget.notes}</div>
        </View>

        <View style={{ width: '100%' }} column grow={1}>
          <View style={{ width: '600px' }} column hAlignContent="right">
            <CostAdder
              budgetUuid={budget.id}
              budgetName={budget.title}
              defaultPricePerDay={budget.defaultPricePerDay}
            />

            <CostsTable costs={budget.costs} />
          </View>
        </View>
      </View>
    ));
  }
}

export default commands(queries(BudgetComponent));
