/*

In this file we can define all the bento-data commands that are needed in our app.

A few basic ones come out of the box with bento-data: `doUpdateLocation` is re-exported
ready to be used by components of our app.

*/

import { Command, doUpdateLocation } from '@buildo/bento/data';
import { budgets } from 'queries';

export { doUpdateLocation };

export const doRefreshUsername = Command({
  params: {},
  invalidates: { budgets },
  run: Promise.resolve.bind(Promise),
});
