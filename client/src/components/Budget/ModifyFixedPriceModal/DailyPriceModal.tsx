import * as React from 'react';
import { Cost, Year, Month } from 'model';
import Modal from 'Modal';
import View from 'View';
import Button from 'Button';
import Input from 'Input';
import CostAllocationDorpdown from 'CostAllocationDropdown';

import './dailyPriceModal.scss';

type Props = {
  cost: Cost | undefined;
  onClose: () => void;
  updateCost: ({ cost }: { cost: Cost }) => void;
};
type State = Cost;

type InputNames = keyof Cost;

const initialState = {
  title: '',
  notes: '',
  allocationMonth: undefined,
  allocationYear: undefined,
  value: '',
};

class DailyPriceModal extends React.PureComponent<Props, State> {
  state = { ...initialState, ...this.props.cost };

  handleUpdateCost = () => {
    const { updateCost, onClose } = this.props;
    const values = this.state;

    Object.keys(values).forEach(
      key => values[key] == null && delete values[key],
    );

    updateCost({ cost: values });
    onClose();
  };

  onChangeInput = (inputName: InputNames) => (inputValue: string): void => {
    this.setState(({
      [inputName]: inputValue,
    } as any) as State);
  };

  onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const values = this.state;
    const value = e.target.value;

    this.setState({
      ...values,
      notes: value,
    });
  };

  render() {
    const { cost, onClose } = this.props;
    const values = this.state;

    if (!cost) return null;

    return (
      <Modal
        iconClose={<div>X</div>}
        onDismiss={onClose}
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}
        title={`modify cost ${cost.title}`}
        footer={
          <View hAlignContent="right">
            <Button size="small" style={{ marginRight: 10 }} onClick={onClose}>
              cancel
            </Button>

            <Button primary size="small" onClick={this.handleUpdateCost}>
              modify fixed cost
            </Button>
          </View>
        }
      >
        <View column className="dailyPriceModal">
          <Input
            label="Title*:"
            value={values.title}
            onChange={this.onChangeInput('title')}
          />

          <Input
            label="Value*:"
            value={values.value || ''}
            onChange={this.onChangeInput('value')}
          />

          <CostAllocationDorpdown
            onChange={this.onChangeInput}
            year={values.allocationYear as Year}
            month={values.allocationMonth as Month}
          />

          <span style={{ fontWeight: 600 }}>Notes:</span>
          <textarea
            style={{ minHeight: 150 }}
            value={values.notes}
            onChange={this.onChangeTextArea}
          />
        </View>
      </Modal>
    );
  }
}

export default DailyPriceModal;
