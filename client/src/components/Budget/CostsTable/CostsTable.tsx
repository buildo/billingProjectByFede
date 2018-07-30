import * as React from 'react';
import { Cost } from 'model';
import Table, { Column, Cell, Header } from 'Table';
import View from 'View';
import { addCommas, getCostValue } from 'utils/costs';

type SortDir = 'asc' | 'desc' | undefined;

type State = {
  sortBy: string;
  sortDir: SortDir;
};

type Props = { costs: Array<Cost> };

const tableWidth = 600;
const columnWidth = tableWidth / 4;

class CostsTable extends React.PureComponent<Props, State> {
  state = {
    sortBy: 'title',
    sortDir: 'asc',
  } as State;

  sortData = (data: Array<Cost>) => data;

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
    const { costs } = this.props;
    const { sortBy, sortDir } = this.state;

    return (
      <Table
        data={this.sortData(costs)}
        height={300}
        width={tableWidth}
        onSortChange={this.onSortChange}
        sortBy={sortBy}
        sortDir={sortDir}
      >
        <Column name="title" sortable width={columnWidth}>
          <Header>Title</Header>
          <Cell>{(_, { title }) => <span>{title}</span>}</Cell>
        </Column>

        <Column name="allocation" sortable width={columnWidth}>
          <Header>Month</Header>
          <Cell>
            {(_, { allocationYear, allocationMonth }) => (
              <View grow={1}>
                {allocationYear &&
                  allocationMonth &&
                  `${allocationYear}/${allocationMonth}`}
              </View>
            )}
          </Cell>
        </Column>

        <Column name="days" sortable width={columnWidth}>
          <Header>Days</Header>
          <Cell>
            {(_, { days, pricePerDay }) => (
              <span>{days && `${days} x ${pricePerDay}€`}</span>
            )}
          </Cell>
        </Column>

        <Column name="value" sortable width={columnWidth}>
          <Header>Amount</Header>
          <Cell>
            {(_, cost: Cost) => (
              <span>{addCommas(`${getCostValue(cost)}€`)}</span>
            )}
          </Cell>
        </Column>
      </Table>
    );
  }
}

export default CostsTable;
