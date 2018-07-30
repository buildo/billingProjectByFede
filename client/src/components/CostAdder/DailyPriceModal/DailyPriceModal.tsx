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
  defaultPricePerDay?: string;
  onClose: () => void;
  addCost: ({ cost }: { cost: Cost }) => void;
};
type State = { inputValues: Cost; pricePerDay: string };

type InputNames = keyof Cost;

const initialState = {
  inputValues: {
    title: '',
    days: '',
    notes: '',
    allocationMonth: undefined,
    allocationYear: undefined,
    pricePerDay: '',
  },
};

class DailyPriceModal extends React.PureComponent<Props, State> {
  state = { ...initialState, pricePerDay: this.props.defaultPricePerDay || '' };

  clearState = () =>
    this.setState({
      ...initialState,
      pricePerDay: this.props.defaultPricePerDay || '',
    } as State);

  handleAddCost = () => {
    const { addCost } = this.props;
    const { inputValues } = this.state;

    Object.keys(inputValues).forEach(
      key => inputValues[key] == null && delete inputValues[key],
    );

    addCost({ cost: inputValues });
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

  render() {
    const { budgetName, onClose } = this.props;
    const { inputValues } = this.state;

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
            value={inputValues.title}
            onChange={this.onChangeInput('title')}
          />

          <View className="values">
            <Input
              label="Daily rate*:"
              type="number"
              value={inputValues.pricePerDay}
              onChange={this.onChangeInput('pricePerDay')}
            />

            <Input
              label="Days*:"
              type="number"
              value={inputValues.days}
              onChange={this.onChangeInput('days')}
            />
          </View>

          <View className="total">
            <Label label="tot.: " />
            <span>
              {inputValues.days &&
                inputValues.pricePerDay &&
                `${parseInt(inputValues.days, 10) *
                  parseInt(inputValues.pricePerDay, 10)}€`}
            </span>
          </View>

          <CostAllocationDorpdown
            onChange={this.onChangeInput}
            year={inputValues.allocationYear}
            month={inputValues.allocationMonth}
          />

          <span style={{ fontWeight: 600 }}>Notes:</span>
          <textarea
            style={{ minHeight: 150 }}
            value={inputValues.notes}
            onChange={this.onChangeTextArea}
          />
        </View>
      </Modal>
    );
  }
}

export default DailyPriceModal;
