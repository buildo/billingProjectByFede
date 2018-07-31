// DO NOT EDIT MANUALLY - metarpheus-generated
import * as t from 'io-ts';

export const UUID = t.string;
export type UUID = string;

export interface Cost {
  title: string;
  value?: string;
  notes?: string;
  pricePerDay?: string;
  days?: string;
  allocationMonth?: string;
  allocationYear?: string;
  uuid?: string;
}

export interface Budget {
  title: string;
  value?: string;
  notes?: string;
  defaultPricePerDay?: string;
  costs: Array<Cost>;
  lastUpdate?: Date;
  creationDate?: Date;
}

export const Cost = t.intersection(
  [
    t.interface({
      title: t.string,
    }),
    t.partial({
      uuid: t.union([t.string, t.undefined, t.null]),
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

export const Budget = t.intersection(
  [
    t.interface({
      title: t.string,
      costs: t.array(Cost),
    }),
    t.partial({
      lastUpdate: t.string,
      creationDate: t.string,
      value: t.union([t.string, t.undefined, t.null]),
      notes: t.union([t.string, t.undefined, t.null]),
      defaultPricePerDay: t.union([t.string, t.undefined, t.null]),
      costs: t.array(Cost),
    }),
  ],
  'Budget',
);
