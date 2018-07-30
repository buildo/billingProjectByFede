// DO NOT EDIT MANUALLY - metarpheus-generated
import * as t from 'io-ts';

export type UUID = string;

export const UUID = t.string;

export interface Cost {
  title: string;
  value?: string;
  notes?: string;
  pricePerDay?: string;
  days?: string;
  allocationMonth?: string;
  allocationYear?: string;
}

export const Cost = t.intersection(
  [
    t.interface({
      title: t.string,
    }),
    t.partial({
      value: t.union([t.string, t.undefined, t.null]),
      notes: t.union([t.string, t.undefined, t.null]),
      pricePerDay: t.union([t.string, t.undefined, t.null]),
      days: t.union([t.string, t.undefined, t.null]),
      allocationMonth: t.union([t.string, t.undefined, t.null]),
      allocationYear: t.union([t.string, t.undefined, t.null]),
    }),
  ],
  'Cost',
);
export interface Budget {
  title: string;
  value?: string;
  notes?: string;
  defaultPricePerDay?: string;
  costs: Array<Cost>;
}

export const Budget = t.intersection(
  [
    t.interface({
      title: t.string,
      costs: t.array(Cost),
    }),
    t.partial({
      value: t.union([t.string, t.undefined, t.null]),
      notes: t.union([t.string, t.undefined, t.null]),
      defaultPricePerDay: t.union([t.string, t.undefined, t.null]),
      costs: t.array(Cost),
    }),
  ],
  'Budget',
);
