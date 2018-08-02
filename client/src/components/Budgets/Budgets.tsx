import * as React from 'react';
import * as _ from 'lodash';
import { declareQueries, declareCommands } from '@buildo/bento/data';
import { budgets } from 'queries';
import { createBudget, doUpdateLocation } from 'commands';
import { addCommas, getBudgetConsumedPercentage } from 'utils/costs';
import Table, { Column, Cell, Header } from 'Table';
import Modal from 'Modal';
import View from 'View';
import LoadingSpinner from 'LoadingSpinner';
import Button from 'Button';
import Input from 'Input';
import { Budget, viewToLocation } from 'model';

import './budgets.scss';

const queries = declareQueries({ budgets });
const commands = declareCommands({ createBudget, doUpdateLocation });

type SortDir = 'asc' | 'desc' | undefined;

type Props = typeof queries.Props & typeof commands.Props;

type State = {
  sortBy: string;
  sortDir: SortDir;
  modalIsOpen: boolean;
  inputValues: Budget;
};

type InputNames = keyof State['inputValues'];

const tableWidth = 600;
const columnWidth = tableWidth / 5;
const isValid = (budget: Budget) => !!budget.title;
const initialState = {
  sortBy: 'name',
  sortDir: 'asc',
  modalIsOpen: false,
  inputValues: {
    title: '',
    value: '',
    notes: '',
    defaultPricePerDay: '',
    costs: [],
  },
};

class Budgets extends React.Component<Props, State> {
  state = initialState as State;

  clearState = () => this.setState(initialState as State);

  sortData = (budgets: Budget[]) => {
    const { sortBy, sortDir } = this.state;

    return _.orderBy(
      budgets.map(budget => ({
        ...budget,
        completion: getBudgetConsumedPercentage(budget),
      })),
      [sortBy],
      [sortDir as string],
    );
  };

  onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { inputValues } = this.state;
    const value = e.target.value;

    this.setState({
      inputValues: {
        ...inputValues,
        notes: value,
      },
    });
  };

  onChangeInput = (inputName: InputNames) => (inputValue: string): void => {
    const { inputValues } = this.state;

    this.setState(({
      inputValues: {
        ...inputValues,
        [inputName]: inputValue,
      },
    } as any) as State);
  };

  openModal = () =>
    this.setState({
      modalIsOpen: true,
    });

  closeModal = () =>
    this.setState({
      modalIsOpen: false,
    });

  goToBudgetDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    const { doUpdateLocation } = this.props;

    const id = (e.target as EventTarget & { id: string }).id;

    doUpdateLocation(viewToLocation({ view: 'budget-details', id }));
  };

  handleAddBudget = () => {
    const { inputValues: budget } = this.state;
    const { createBudget } = this.props;

    if (!isValid(budget)) {
      alert('you forgot some mandatory fields!');
      return;
    }

    createBudget({ budget });
    this.clearState();

    this.closeModal();
  };

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
    const { sortBy, sortDir, modalIsOpen, inputValues } = this.state;

    return (
      <View className="budgets">
        {modalIsOpen && (
          <Modal
            transitionEnterTimeout={0}
            transitionLeaveTimeout={0}
            onDismiss={this.closeModal}
            iconClose={<div>X</div>}
            title="add a new Budget"
            footer={
              <View hAlignContent="right">
                <Button
                  size="small"
                  style={{ marginRight: 10 }}
                  onClick={this.closeModal}
                >
                  cancel
                </Button>
                <Button primary size="small" onClick={this.handleAddBudget}>
                  add budget
                </Button>
              </View>
            }
          >
            <View column className="budgetModalBody">
              <Input
                label="Title*:"
                value={inputValues.title}
                onChange={this.onChangeInput('title')}
              />
              <Input
                label="Amount:"
                type="number"
                value={inputValues.value || ''}
                onChange={this.onChangeInput('value')}
              />
              <Input
                label="Daily rate:"
                type="number"
                value={inputValues.defaultPricePerDay || ''}
                onChange={this.onChangeInput('defaultPricePerDay')}
              />
              <span style={{ fontWeight: 600 }}>notes:</span>
              <textarea
                style={{ minHeight: 150 }}
                value={inputValues.notes as string}
                onChange={this.onChangeTextArea}
              />
            </View>
          </Modal>
        )}

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
              <View column hAlignContent="center">
                <h1>Budgets</h1>
              </View>

              <View column hAlignContent="right">
                <Button className="budgetAdder" onClick={this.openModal}>
                  add a new budget
                </Button>
              </View>

              <Table
                data={this.sortData(budgets.value)}
                height={300}
                width={tableWidth}
                onSortChange={this.onSortChange}
                sortBy={sortBy}
                sortDir={sortDir}
              >
                <Column name="creationDate" sortable width={columnWidth}>
                  <Header>Creation date</Header>
                  <Cell>
                    {(_, { creationDate }) => {
                      const date = new Date(creationDate);

                      return <span>{date.toLocaleDateString('it')}</span>;
                    }}
                  </Cell>
                </Column>

                <Column name="lastUpdate" sortable width={columnWidth}>
                  <Header>Last update</Header>
                  <Cell>
                    {(_, { lastUpdate }) => {
                      const date = new Date(lastUpdate);

                      return (
                        <span>{`${date.toLocaleDateString(
                          'it',
                        )} - ${date.getHours()}:${date.getMinutes()}`}</span>
                      );
                    }}
                  </Cell>
                </Column>

                <Column name="title" sortable width={columnWidth}>
                  <Header>Title</Header>
                  <Cell>
                    {(_, { title, uuid }) => (
                      <View
                        grow={1}
                        className="clickable"
                        id={uuid}
                        onClick={this.goToBudgetDetail}
                      >
                        {title}
                      </View>
                    )}
                  </Cell>
                </Column>

                <Column name="value" sortable width={columnWidth}>
                  <Header>Amount</Header>
                  <Cell>
                    {(_, { value }) => (
                      <span>{value ? `${addCommas(value)}€` : '--'}</span>
                    )}
                  </Cell>
                </Column>

                <Column name="completion" sortable width={columnWidth}>
                  <Header>% consumed</Header>
                  <Cell>
                    {(_, { completion }) => (
                      <span className={completion > 100 ? 'danger' : ''}>
                        {completion}%
                      </span>
                    )}
                  </Cell>
                </Column>
              </Table>
            </View>
          )}
      </View>
    );
  }
}

export default commands(queries(Budgets));
