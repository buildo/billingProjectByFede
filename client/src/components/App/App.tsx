/*

This component is the entry point for our app.
It must be named exactly `App` and live in the `components/App` folder.
Typical tasks performed in this component are:
- general app layout
- choosing the correct component to render based on the current view

In this simple example it does a bit of both.

*/

import * as React from 'react';
import View from 'View';
import Budget from 'Budget';
import Budgets from 'Budgets';
import { declareQueries } from '@buildo/bento/data';
import { currentView } from 'queries';

import './app.scss';

const queries = declareQueries({ currentView });

class App extends React.Component<typeof queries.Props> {
  render() {
    const { currentView } = this.props;

    return (
      <View column className="app">
        <View style={{ marginBottom: 50 }}>
          <img
            style={{ height: 55, width: 55 }}
            src="http://d1muf25xaso8hp.cloudfront.net/http%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1514976142941x689545467030257000%2Flogo_buildo.png?w=64&amp;h=64&amp;auto=compress&amp;fit=crop"
          />
          <View vAlignContent="center">
            <span style={{ fontSize: 28, marginLeft: 15 }}>
              <span color="#808080">buildo</span> billing
            </span>
          </View>
        </View>
        {currentView.ready && (
          <View className="appBodyWrapper" column>
            {currentView.value.view === 'budgets' && <Budgets />}
            {currentView.value.view === 'budget-details' && <Budget />}
          </View>
        )}
      </View>
    );
  }
}

export default queries(App);
