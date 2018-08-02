// DO NOT EDIT MANUALLY - metarpheus-generated
import axios, { AxiosError } from 'axios';
import * as t from 'io-ts';
import * as m from './model-ts';

export interface RouteConfig {
  apiEndpoint: string;
  timeout: number;
  unwrapApiResponse: (resp: any) => any;
}

import { PathReporter } from 'io-ts/lib/PathReporter';
function valueOrThrow<T extends t.Type<any, any>>(
  iotsType: T,
  value: T['_I'],
): t.TypeOf<T> {
  const validatedValue = iotsType.decode(value);

  if (validatedValue.isLeft()) {
    throw new Error(PathReporter.report(validatedValue).join('\n'));
  }

  return validatedValue.value;
}

const parseError = (err: AxiosError) => {
  try {
    const { errors = [] } = err.response!.data;
    return Promise.reject({ status: err.response!.status, errors });
  } catch (e) {
    return Promise.reject({
      status: (err && err.response && err.response.status) || 0,
      errors: [],
    });
  }
};

export default function getRoutes(config: RouteConfig) {
  return {
    budgetApi_getBudgets: function(): Promise<m.Budget[]> {
      return axios({
        method: 'get',
        url: `${config.apiEndpoint}/billing/getBudgets`,
        params: {},
        data: {},
        headers: {
          'Content-Type': 'application/json',
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache, no-store',
        },
        timeout: config.timeout,
      }).then(
        res =>
          valueOrThrow(
            t.dictionary(t.string, m.Budget),
            config.unwrapApiResponse(res.data),
          ),
        parseError,
      ) as any;
    },

    budgetApi_saveBudget: function({
      budget,
    }: {
      budget: m.Budget;
    }): Promise<string> {
      return axios({
        method: 'post',
        url: `${config.apiEndpoint}/billing/saveBudget`,
        params: {},
        data: {
          budget,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: config.timeout,
      }).then(
        res => valueOrThrow(t.string, config.unwrapApiResponse(res.data)),
        parseError,
      ) as any;
    },

    budgetApi_updateBudget: function({
      uuid,
      budget,
    }: {
      uuid: string;
      budget: m.Budget;
    }): Promise<string> {
      return axios({
        method: 'post',
        url: `${config.apiEndpoint}/billing/updateBudget`,
        params: {},
        data: {
          uuid,
          budget,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: config.timeout,
      }).then(
        res => valueOrThrow(t.string, config.unwrapApiResponse(res.data)),
        parseError,
      ) as any;
    },

    budgetApi_addBudgetCost: function({
      budgetUuid,
      cost,
    }: {
      budgetUuid: string;
      cost: m.Cost;
    }): Promise<string> {
      return axios({
        method: 'post',
        url: `${config.apiEndpoint}/billing/addBudgetCost`,
        params: {},
        data: {
          budgetUuid,
          cost,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: config.timeout,
      }).then(
        res => valueOrThrow(t.string, config.unwrapApiResponse(res.data)),
        parseError,
      ) as any;
    },

    budgetApi_modifyBudgetCost: function({
      budgetUuid,
      cost,
    }: {
      budgetUuid: string;
      cost: m.Cost;
    }): Promise<string> {
      return axios({
        method: 'post',
        url: `${config.apiEndpoint}/billing/modifyBudgetCost`,
        params: {},
        data: {
          budgetUuid,
          cost,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: config.timeout,
      }).then(
        res => valueOrThrow(t.string, config.unwrapApiResponse(res.data)),
        parseError,
      ) as any;
    },
  };
}
