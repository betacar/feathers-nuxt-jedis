'use strict';

import tweets from './tweets/tweets.service.js';
import keywords from './keywords/keywords.service.js';

export default function () {
  const app = this; // eslint-disable-line no-unused-vars

  app.configure(tweets);
  app.configure(keywords);
}
