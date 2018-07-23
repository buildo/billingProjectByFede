import * as React from 'react';
import View from 'View';
import { FormattedMessage } from 'react-intl';
import { declareQueries } from '@buildo/bento/data';
import { budgets } from 'queries';

import './hello.scss';

const queries = declareQueries({ budgets });

const HelloName = queries(
  ({ budgets }: typeof queries.Props) =>
    !budgets.ready ? (
      <View>...</View>
    ) : (
      <FormattedMessage id="Hello.hello" values={{ name: 'caio' }} />
    ),
);

type State = {
  value: string;
  length: number;
  showError: boolean;
};

export default class Hello extends React.Component<{}, State> {
  state = {
    value: '10',
    length: 10,
    showError: false,
  };

  onLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseInt(value);

    const betweenSixAndFifty =
      !isNaN(parsedValue) && parsedValue >= 6 && parsedValue <= 50;

    if (!value) {
      this.setState({ value: '' });
    } else if (betweenSixAndFifty) {
      this.setState({ value, length: parsedValue, showError: false });
    } else {
      this.setState({ value, showError: true });
    }
  };

  render() {
    const {
      state: { value, showError },
      onLengthChange,
    } = this;

    return (
      <View column className="hello">
        <View vAlignContent="center">
          <View className="label">length:</View>
          <input type="number" value={value} onChange={onLengthChange} />
          {showError && (
            <span className="warning">
              <FormattedMessage id="Hello.warningLength" />
            </span>
          )}
        </View>
        <HelloName />
      </View>
    );
  }
}
