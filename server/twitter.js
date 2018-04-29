'use strict';

import Twitter from 'twitter-stream-api';

export default function () {
  const app = this; // eslint-disable-line no-unused-vars
  const twitter = new Twitter(app.get('twitter'));

  app.set('twitterClient', twitter);
  twitter.on('data', tweet => app.service('api/v1/tweets').create(tweet));
}
