const assert = require('assert');
const app = require('../../src/app');
const request = require('supertest');


const port = app.get('port') || 3030;
const appUrl = `http://localhost:${port}`;

describe('\'stations\' service', () => {
  before(async () => {
    this.server = await app.listen(port);
    const mongoose = app.get('mongooseClient');
    for (let collection in mongoose.connection.collections) {
      mongoose.connection.collections[collection].deleteOne(function() {});
    }
  });

  after(() => {
    this.server.close();
  });

  it('registered the service', () => {
    const service = app.service('stations');
    assert.ok(service, 'Registered the service');
  });

  it('should create a station without errors', async () => {
    const response = await request(appUrl)
      .post('/stations').send({
        name: 'string longer than 3'
      });
    assert.strictEqual(response.body.name, 'string longer than 3');
    this.id = response.body._id;
  });

  it('should not create a station and return a error', async () => {
    const response = await request(appUrl)
      .post('/stations').send({
        name: 'a'
      });
    assert.strictEqual(response.body.name, 'BadRequest');
    assert.strictEqual(response.body.message, 'stations validation failed: name: a is too short');
  });

  it('should not update a station and return a error', async () => {
    const response = await request(appUrl)
      .put(`/stations/${this.id}`).send({
        name: 'a'
      });
    assert.strictEqual(response.body.name, 'BadRequest');
    assert.strictEqual(response.body.message, 'stations validation failed: name: a is too short');
  });

  it('should update without errors', async () => {
    const response = await request(appUrl)
      .put(`/stations/${this.id}`).send({
        name: 'longer than 3'
      });
    assert.strictEqual(response.body.name, 'longer than 3');
  });

  it('should list all stations', async () => {
    const response = await request(appUrl)
      .get('/stations/');
    assert.strictEqual(typeof response.body.data, 'object');
  });

  it('should get a station', async () => {
    const response = await request(appUrl)
      .get(`/stations/${this.id}`);
    assert.strictEqual(response.body.name, 'longer than 3');
  });

  it('should delete a station', async () => {
    const response = await request(appUrl)
      .delete(`/stations/${this.id}`);
    assert.strictEqual(response.status, 200);
  });

});
