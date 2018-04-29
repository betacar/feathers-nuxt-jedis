'use strict'

import nuxt from './nuxt';

export default function () {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  app.use((req, res, next) => {
    switch (true) {
    case req.headers['content-type'] === 'application/json':
    case /^\/api/.test(req.path):
      next();
      break;
    default:
      return nuxt.render(req, res, next);
    }
  });
};
