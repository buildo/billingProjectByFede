import * as React from 'react';
import * as _ from 'lodash';
import { declareQueries, declareCommands } from '@buildo/bento/data';
import { budgets } from 'queries';
import { createBudget, doUpdateLocation } from 'commands';
import { getBudgetConsumedPercentage } from 'utils/costs';
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
const columnWidth = tableWidth / 4;

class Budgets extends React.Component<Props, State> {
  state = {
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
  } as State;

  sortData = (budgets: { [key: string]: Budget }) => {
    const { sortBy, sortDir } = this.state;

    return _.orderBy(
      Object.keys(budgets).map(id => ({
        ...budgets[id],
        id,
        completion: getBudgetConsumedPercentage(budgets[id]),
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

    createBudget({ budget });

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
                label="Value:"
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
                value={inputValues.notes}
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
                <Column name="lastUpdate" sortable width={columnWidth}>
                  <Header>Last update</Header>
                  <Cell>{() => <span>30/07/2018</span>}</Cell>
                </Column>

                <Column name="title" sortable width={columnWidth}>
                  <Header>Title</Header>
                  <Cell>
                    {(_, { title, id }) => (
                      <View
                        grow={1}
                        className="clickable"
                        id={id}
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
                      <span>{value ? `${value}€` : '--'}</span>
                    )}
                  </Cell>
                </Column>

                <Column name="completion" sortable width={columnWidth}>
                  <Header>% consumed</Header>
                  <Cell>
                    {(_, { completion }) => <span>{completion}%</span>}
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
