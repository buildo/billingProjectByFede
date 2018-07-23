import * as metarpheusRoutes from 'metarpheus/routes-ts';
import * as config from 'config';

export const metaRoutes = metarpheusRoutes.default({
  ...config,
  unwrapApiResponse: a => a,
});
