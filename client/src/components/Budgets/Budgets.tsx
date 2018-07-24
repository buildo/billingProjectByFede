import * as React from 'react';
import { declareQueries } from '@buildo/bento/data';
import { budgets } from 'queries';
import Table, { Column, Cell, Header } from 'Table';
import View from 'View';
import LoadingSpinner from 'LoadingSpinner';
import Button from 'Button';
import { Budget } from 'model';

import './budgets.scss';

const queries = declareQueries({ budgets });

type SortDir = 'asc' | 'desc' | undefined;

type State = {
  sortBy: string;
  sortDir: SortDir;
};

class Budgets extends React.Component<typeof queries.Props, State> {
  state = {
    sortBy: 'name',
    sortDir: 'asc',
  } as State;

  sortData = (data: Array<Budget>) => {
    const { sortDir } = this.state;

    return sortDir === 'desc' ? data.reverse() : data;
  };

  addBudget = () => console.log('added');

  onSortChange = ({
    sortBy,
    sortDir,
  }: {
    sortBy?: string;
    sortDir?: SortDir;
  }): void =>
    this.setState({
      sortBy,
      sortDir,
    } as State);

  render() {
    const { budgets } = this.props;
    const { sortBy, sortDir } = this.state;

    return (
      <View className="budgets">
        {(!budgets.ready || budgets.loading) && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <LoadingSpinner size={45} message={{ content: 'Loading...' }} />
          </View>
        )}

        {budgets.ready &&
          !budgets.loading && (
            <View column>
              <Button onClick={this.addBudget}>add a new budget</Button>

              <Table
                data={this.sortData(
                  Object.keys(budgets.value).map(id => ({
                    ...budgets.value[id],
                    id,
                  })),
                )}
                height={300}
                width={600}
                onSortChange={this.onSortChange}
                sortBy={sortBy}
                sortDir={sortDir}
              >
                <Column name="name" sortable width={200}>
                  <Header>Name</Header>
                  <Cell>
                    {(_, { name, id }) => (
                      <div
                        className="budgetName"
                        onClick={() => console.log(id)}
                      >
                        {name}
                      </div>
                    )}
                  </Cell>
                </Column>

                <Column name="price" sortable width={200}>
                  <Header>budget tot.</Header>
                  <Cell>{(_, { price }) => <span>{price}€</span>}</Cell>
                </Column>

                <Column name="completion" sortable width={200}>
                  <Header>% spent</Header>
                  <Cell>{(_, { price }) => <span>{price}€</span>}</Cell>
                </Column>
              </Table>
            </View>
          )}
      </View>
    );
  }
}

export default queries(Budgets);
