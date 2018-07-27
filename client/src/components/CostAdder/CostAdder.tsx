import * as React from 'react';
import DropdownMenu, { DropdownItem } from 'DropdownMenu';
import { declareCommands } from '@buildo/bento/data';
import { createBudget } from 'commands';
import DailyPriceModal from './DailyPriceModal';
import FixedPriceModal from './FixedPriceModal';

import './costAdder.scss';
import View from 'View';

type Modal = 'fixedPriceModal' | 'dailyPriceModal';

type State = { [key in Modal]: boolean };

const initialState = {
  fixedPriceModal: false,
  dailyPriceModal: false,
};

const commands = declareCommands({ createBudget });

class BudgetAdder extends React.PureComponent<typeof commands.Props, State> {
  state = initialState;

  openModal = (modal: Modal) =>
    this.setState({
      [modal]: true,
    } as State);

  closeModals = () => this.setState(initialState);

  render() {
    const { fixedPriceModal, dailyPriceModal } = this.state;

    console.log(this.state);

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

        {fixedPriceModal && <FixedPriceModal onClose={this.closeModals} />}

        {dailyPriceModal && <DailyPriceModal onClose={this.closeModals} />}
      </View>
    );
  }
}

export default commands(BudgetAdder);
