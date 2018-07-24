import * as React from 'react';
import DropdownMenu, { DropdownItem } from 'DropdownMenu';
import { declareCommands } from '@buildo/bento/data';
import { createBudget } from 'commands';

type State = object;

const commands = declareCommands({ createBudget });

class BudgetAdder extends React.PureComponent<typeof commands.Props, State> {
  render() {
    return (
      <DropdownMenu onClick={console.log} caption="add a cost">
        <DropdownItem name="fixed">add a fixed cost</DropdownItem>
        <DropdownItem name="daily">add a daily cost</DropdownItem>
      </DropdownMenu>
    );
  }
}

export default commands(BudgetAdder);
