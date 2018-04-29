const assert = require('assert');
const app = require('../../server/app');

describe('\'tweets\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/tweets');

    assert.ok(service, 'Registered the service');
  });
});
