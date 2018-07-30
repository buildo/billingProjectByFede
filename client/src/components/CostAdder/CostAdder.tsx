import * as React from 'react';
import DropdownMenu, { DropdownItem } from 'DropdownMenu';
import { declareCommands } from '@buildo/bento/data';
import { createBudget, addCost } from 'commands';
import DailyPriceModal from './DailyPriceModal';
import FixedPriceModal from './FixedPriceModal';

import './costAdder.scss';
import View from 'View';

type Modal = 'fixedPriceModal' | 'dailyPriceModal';

type State = { [key in Modal]: boolean };
type Props = typeof commands.Props & {
  budgetUuid: string;
  budgetName: string;
  defaultPricePerDay: string | undefined;
};

const initialState = {
  fixedPriceModal: false,
  dailyPriceModal: false,
};

const commands = declareCommands({ addCost, createBudget });

class BudgetAdder extends React.PureComponent<Props, State> {
  state = initialState;

  openModal = (modal: Modal) =>
    this.setState({
      [modal]: true,
    } as State);

  closeModals = () => this.setState(initialState);

  render() {
    const { addCost, budgetUuid, budgetName, defaultPricePerDay } = this.props;
    const { fixedPriceModal, dailyPriceModal } = this.state;

    return (
      <View>
        <DropdownMenu
          className="costAdder"
          onClick={this.openModal}
          caption="add a cost"
        >
          <DropdownItem name="fixedPriceModal">add a fixed cost</DropdownItem>
          <DropdownItem name="dailyPriceModal">add a daily cost</DropdownItem>
        </DropdownMenu>

        {fixedPriceModal && (
          <FixedPriceModal
            addCost={addCost}
            budgetUuid={budgetUuid}
            budgetName={budgetName}
            onClose={this.closeModals}
          />
        )}

        {dailyPriceModal && (
          <DailyPriceModal
            onClose={this.closeModals}
            addCost={addCost}
            budgetUuid={budgetUuid}
            budgetName={budgetName}
            defaultPricePerDay={defaultPricePerDay}
          />
        )}
      </View>
    );
  }
}

export default commands(BudgetAdder);
