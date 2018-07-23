const fs = require('fs');
const metarpheus = require('metarpheus');
const metarpheusIoTs = require('metarpheus-io-ts');

const paths = [
  '/Users/federicosordillo/git/buildo/onboarding/rps/api/src/main/scala',
];

const { models, routes } = metarpheus.run(paths);

const ioTsModels = metarpheusIoTs.getModels(models, {
  runtime: true,
});
const ioTsRoutes = metarpheusIoTs.getRoutes(routes, models, {});

fs.writeFile('src/metarpheus/routes-ts.ts', ioTsRoutes, err => {
  if (err) throw err;
  console.log('routes have been saved');
});

fs.writeFile('src/metarpheus/model-ts.ts', ioTsModels, err => {
  if (err) throw err;
  console.log('models have been saved');
});
