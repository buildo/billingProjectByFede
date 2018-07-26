import * as React from 'react';
import * as _ from 'lodash';
import { declareQueries, declareCommands } from '@buildo/bento/data';
import { budgets } from 'queries';
import { createBudget, doUpdateLocation } from 'commands';
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
    },
  } as State;

  sortData = (budgets: { [key: string]: Budget }) => {
    const { sortBy, sortDir } = this.state;

    return _.orderBy(
      Object.keys(budgets).map(id => ({
        ...budgets[id],
        id,
        completion: 0,
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
    const { inputValues } = this.state;
    const { createBudget } = this.props;

    createBudget({ budget: inputValues });
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
                label="Value*:"
                type="number"
                value={inputValues.value}
                onChange={this.onChangeInput('value')}
              />
              <Input
                label="default price per day:"
                type="number"
                value={inputValues.defaultPricePerDay}
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
              <Button onClick={this.openModal}>add a new budget</Button>

              <Table
                data={this.sortData(budgets.value)}
                height={300}
                width={600}
                onSortChange={this.onSortChange}
                sortBy={sortBy}
                sortDir={sortDir}
              >
                <Column name="title" sortable width={200}>
                  <Header>Title</Header>
                  <Cell>
                    {(_, { title, id }) => (
                      <div
                        className="budgetName"
                        id={id}
                        onClick={this.goToBudgetDetail}
                      >
                        {title}
                      </div>
                    )}
                  </Cell>
                </Column>

                <Column name="value" sortable width={200}>
                  <Header>Value</Header>
                  <Cell>{(_, { value }) => <span>{value}€</span>}</Cell>
                </Column>

                <Column name="completion" sortable width={200}>
                  <Header>% spent</Header>
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
