import { introHandler, timestampHandler } from './handlers/index';

export function routes(app) {
  app.get('/', introHandler);
  app.get('/timestamp/:date', timestampHandler);
};