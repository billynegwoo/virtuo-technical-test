const assert = require('assert');
const app = require('../../src/app');
const url = require('url');

const port = app.get('port') || 3030;
const getUrl = pathname => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
});

describe('\'stations\' service', () => {

  before(function(done) {
    this.server = app.listen(port);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  it('registered the service', () => {
    const service = app.service('stations');

    assert.ok(service, 'Registered the service');
  });

  it('should create a station without errors', () => {

  });

  it('should not create a station and return a error', () => {

  });

  it('should not update a station and return a error', () => {

  });

  it('should update a station without errors', () => {

  });

  it('should list all stations', () => {

  });

  it('should get a station', () => {

  });

  it('should delete a station', () => {

  });

});
