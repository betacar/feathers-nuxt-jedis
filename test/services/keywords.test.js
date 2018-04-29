const assert = require('assert');
const app = require('../../server/app');

describe('\'keywords\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/keywords');

    assert.ok(service, 'Registered the service');
  });
});
