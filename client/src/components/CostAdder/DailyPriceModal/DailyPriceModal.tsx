import * as React from 'react';
import { Cost } from 'model';
import Modal from 'Modal';
import View from 'View';
import Button from 'Button';
import Input from 'Input';
import CostAllocationDorpdown from 'CostAllocationDropdown';
import Label from 'Label';

import './dailyPriceModal.scss';

type Props = {
  budgetUuid: string;
  budgetName: string;
  defaultPricePerDay: string;
  onClose: () => void;
  addCost: ({ cost }: { cost: Cost }) => void;
};
type State = Cost;

type InputNames = keyof Cost;

const initialState = {
  title: '',
  days: '',
  notes: '',
  allocationMonth: undefined,
  allocationYear: undefined,
  pricePerDay: '',
};

class DailyPriceModal extends React.PureComponent<Props, State> {
  state = {
    ...initialState,
    pricePerDay: this.props.defaultPricePerDay,
  };

  handleAddCost = () => {
    const { addCost } = this.props;
    const state = this.state;

    Object.keys(state).forEach(key => state[key] == null && delete state[key]);

    addCost({ cost: state });
  };

  onChangeInput = (inputName: InputNames) => (inputValue: string): void => {
    const state = this.state;

    this.setState(({
      ...state,
      [inputName]: inputValue,
    } as any) as State);
  };

  onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const state = this.state;
    const value = e.target.value;

    this.setState({
      ...state,
      notes: value,
    });
  };

  render() {
    const { budgetName, onClose } = this.props;
    const state = this.state;

    return (
      <Modal
        iconClose={<div>X</div>}
        onDismiss={onClose}
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}
        title={`add a new daily cost for budget ${budgetName}`}
        footer={
          <View hAlignContent="right">
            <Button size="small" style={{ marginRight: 10 }} onClick={onClose}>
              cancel
            </Button>

            <Button primary size="small" onClick={this.handleAddCost}>
              add daily cost
            </Button>
          </View>
        }
      >
        <View column className="dailyPriceModal">
          <Input
            label="Title*:"
            value={state.title}
            onChange={this.onChangeInput('title')}
          />

          <View className="values">
            <Input
              label="Daily rate*:"
              type="number"
              value={state.pricePerDay}
              onChange={this.onChangeInput('pricePerDay')}
            />

            <Input
              label="Days*:"
              type="number"
              value={state.days}
              onChange={this.onChangeInput('days')}
            />
          </View>

          <View className="total">
            <Label label="tot.: " />
            <span>
              {state.days &&
                state.pricePerDay &&
                `${parseInt(state.days, 10) *
                  parseInt(state.pricePerDay, 10)}€`}
            </span>
          </View>

          <CostAllocationDorpdown
            onChange={this.onChangeInput}
            year={state.allocationYear}
            month={state.allocationMonth}
          />

          <span style={{ fontWeight: 600 }}>Notes:</span>
          <textarea
            style={{ minHeight: 150 }}
            value={state.notes}
            onChange={this.onChangeTextArea}
          />
        </View>
      </Modal>
    );
  }
}

export default DailyPriceModal;
