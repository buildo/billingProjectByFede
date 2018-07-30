import * as React from 'react';
import { Cost } from 'model';
import Modal from 'Modal';
import View from 'View';
import Button from 'Button';
import Input from 'Input';
import CostAllocationDorpdown from 'CostAllocationDropdown';

import './fixedPriceModal.scss';

type Props = {
  budgetUuid: string;
  budgetName: string;
  onClose: () => void;
  addCost: ({ cost }: { cost: Cost }) => void;
};
type State = { inputValues: Cost };

type InputNames = keyof Cost;

const initialState = {
  inputValues: {
    title: '',
    value: '',
    notes: '',
    allocationMonth: undefined,
    allocationYear: undefined,
  },
};

class FixedPriceModal extends React.PureComponent<Props, State> {
  state = initialState;

  clearState = () => this.setState(initialState as State);

  handleAddCost = () => {
    const { addCost } = this.props;
    const { inputValues } = this.state;

    Object.keys(inputValues).forEach(
      key => inputValues[key] == null && delete inputValues[key],
    );

    addCost({ cost: inputValues });
    this.clearState();
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
        title={`add a new fixed cost for budget ${budgetName}`}
        footer={
          <View hAlignContent="right">
            <Button size="small" style={{ marginRight: 10 }} onClick={onClose}>
              cancel
            </Button>

            <Button primary size="small" onClick={this.handleAddCost}>
              add fixed cost
            </Button>
          </View>
        }
      >
        <View column className="fixedPriceModal">
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

export default FixedPriceModal;
