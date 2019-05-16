const assert = require('assert');
const app = require('../../src/app');
const request = require('supertest');

const port = app.get('port') || 3030;

describe('\'cars\' service', () => {
  before(function(done) {
    this.server = app.listen(port);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  it('registered the service', () => {
    const service = app.service('cars');
    assert.ok(service, 'Registered the service');
  });

  it('should create a car without errors', () => {

  });

  it('should not create a car and return a error', () => {

  });

  it('should not update a car and return a error', () => {

  });

  it('should update without errors', () => {

  });

  it('should list all cars', () => {

  });

  it('should get a car', () => {

  });

  it('should delete a car', () => {

  });

});
