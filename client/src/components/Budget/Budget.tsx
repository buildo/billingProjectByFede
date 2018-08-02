import * as React from 'react';
import { Option, none, some } from 'fp-ts/lib/Option';
import { declareQueries, declareCommands } from '@buildo/bento/data';
import { budgets, currentView } from 'queries';
import { Budget, Cost, viewToLocation } from 'model';
import { doUpdateLocation, updateCost } from 'commands';
import {
  addCommas,
  getBudgetConsumed,
  getBudgetConsumedPercentage,
} from 'utils/costs';
import CostAdder from 'CostAdder';
import GoBackIcon from 'GoBackIcon';
import View from 'View';
import CostsTable from './CostsTable';
import ModifyDailyPriceModal from './ModifyDailyPriceModal';
import ModifyFixedPriceModal from './ModifyFixedPriceModal';

import './budget.scss';

const queries = declareQueries({ budgets, currentView });
const commands = declareCommands({ doUpdateLocation, updateCost });

type Props = typeof queries.Props & typeof commands.Props;
type State = {
  costToModify: Cost | undefined;
};

class BudgetComponent extends React.PureComponent<Props, State> {
  state = {
    costToModify: undefined,
  } as State;

  goBack = () => {
    const { doUpdateLocation } = this.props;

    doUpdateLocation(viewToLocation({ view: 'budgets' }));
  };

  handleUpdateCost = ({ cost }: { cost: Cost }) =>
    this.getBudget().fold(null, (budget: Budget & { id: string }) => {
      console.log(budget);

      return this.props.updateCost({
        cost,
        budgetUuid: budget.uuid as string,
      });
    });

  handleCostClick = ({ costToModify }: { costToModify: Cost }) =>
    this.setState({
      costToModify,
    });

  handleCloseModify = () =>
    this.setState({
      costToModify: undefined,
    });

  getBudget = (): Option<Budget> => {
    const { currentView, budgets } = this.props;

    return currentView.ready &&
      budgets.ready &&
      !currentView.loading &&
      currentView.value.view === 'budget-details'
      ? some(budgets.value.find(
          budget =>
            currentView.value.view === 'budget-details' &&
            budget.uuid === currentView.value.id,
        ) as Budget)
      : none;
  };

  render() {
    const { costToModify } = this.state;

    return this.getBudget().fold(null, (budget: Budget & { id: string }) => (
      <View column className="budget" hAlignContent="center">
        {costToModify ? (
          costToModify.days ? (
            <ModifyDailyPriceModal
              cost={costToModify}
              onClose={this.handleCloseModify}
              updateCost={this.handleUpdateCost}
            />
          ) : (
            <ModifyFixedPriceModal
              cost={costToModify}
              onClose={this.handleCloseModify}
              updateCost={this.handleUpdateCost}
            />
          )
        ) : null}

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
            <div>
              {budget.value ? `${addCommas(`${budget.value}`)}€` : '--'}
            </div>
          </View>

          <View column grow={1}>
            <h3>costs:</h3>
            <div>{`${addCommas(`${getBudgetConsumed(budget)}`)}€`}</div>
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

        <View
          className="costsTableWrapper"
          style={{ width: '100%' }}
          column
          grow={1}
          hAlignContent="center"
        >
          <View style={{ width: '600px' }} column hAlignContent="right">
            <CostAdder
              budgetUuid={budget.uuid as string}
              budgetName={budget.title}
              defaultPricePerDay={budget.defaultPricePerDay || undefined}
            />

            <CostsTable
              costs={budget.costs}
              onCostClick={this.handleCostClick}
            />
          </View>
        </View>
      </View>
    ));
  }
}

export default commands(queries(BudgetComponent));
