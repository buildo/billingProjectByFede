// DO NOT EDIT MANUALLY - metarpheus-generated
import * as t from 'io-ts';

export type UUID = string;

export const UUID = t.string;

export interface Budget {
  name: string;
  price: number;
}

export const Budget = t.interface(
  {
    name: t.string,
    price: t.number,
  },
  'Budget',
);
