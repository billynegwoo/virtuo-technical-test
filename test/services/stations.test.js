const assert = require('assert');
const app = require('../../src/app');

describe('\'stations\' service', () => {
  it('registered the service', () => {
    const service = app.service('stations');

    assert.ok(service, 'Registered the service');
  });
});
