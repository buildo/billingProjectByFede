// DO NOT EDIT MANUALLY - metarpheus-generated
import * as t from 'io-ts';

export type UUID = string;

export const UUID = t.string;

export interface Budget {
  title: string;
  value: string;
  notes: string;
  defaultPricePerDay: string;
}

export const Budget = t.interface(
  {
    title: t.string,
    value: t.string,
    notes: t.string,
    defaultPricePerDay: t.string,
  },
  'Budget',
);
