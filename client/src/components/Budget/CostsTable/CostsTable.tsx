import * as React from 'react';
import { Cost } from 'model';
import Table, { Column, Cell, Header } from 'Table';
import View from 'View';
import { addCommas, getCostValue } from 'utils/costs';

type SortDir = 'asc' | 'desc' | undefined;

type State = {
  sortBy: string | undefined;
  sortDir: SortDir;
};

type Props = {
  costs: Array<Cost>;
  onCostClick({ costToModify }: { costToModify: Cost }): void;
};

const tableWidth = 600;
const columnWidth = tableWidth / 4;

class CostsTable extends React.PureComponent<Props, State> {
  state = {
    sortBy: undefined,
    sortDir: undefined,
  } as State;

  sortData = (data: Array<Cost>) => data.reverse();

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
          <Cell>
            {(_, cost: Cost) => (
              <span
                className="clickable"
                onClick={() => this.props.onCostClick({ costToModify: cost })}
              >
                {cost.title}
                {cost.notes && (
                  <div
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: '50%',
                      backgroundColor: 'grey',
                      display: 'inline-block',
                      marginLeft: 5,
                      verticalAlign: 'bottom',
                      textAlign: 'center',
                      fontSize: 10,
                    }}
                  />
                )}
              </span>
            )}
          </Cell>
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
            {(_, { days, pricePerDay }) =>
              days ? (
                <span>
                  {days}gg
                  <strong> x </strong>
                  {pricePerDay}€
                </span>
              ) : null
            }
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
