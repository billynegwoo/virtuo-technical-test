const assert = require('assert');
const app = require('../../src/app');
const request = require('supertest');


const port = app.get('port') || 3030;
const appUrl = `http://localhost:${port}`;

describe('\'cars\' service', () => {
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
    const service = app.service('cars');
    assert.ok(service, 'Registered the service');
  });

  it('should create a car without errors', async () => {
    const response = await request(appUrl)
      .post('/cars').send({
        name: 'string longer than 3'
      });
    assert.strictEqual(response.body.name, 'string longer than 3');
    this.id = response.body._id;
  });

  it('should not create a car and return a error', async () => {
    const response = await request(appUrl)
      .post('/cars').send({
        name: 'a'
      });
    assert.strictEqual(response.body.name, 'BadRequest');
    assert.strictEqual(response.body.message, 'cars validation failed: name: a is too short');
  });

  it('should not update a car and return a error', async () => {
    const response = await request(appUrl)
      .put(`/cars/${this.id}`).send({
        name: 'a'
      });
    assert.strictEqual(response.body.name, 'BadRequest');
    assert.strictEqual(response.body.message, 'cars validation failed: name: a is too short');
  });

  it('should update without errors', async () => {
    const response = await request(appUrl)
      .put(`/cars/${this.id}`).send({
        name: 'longer than 3'
      });
    assert.strictEqual(response.body.name, 'longer than 3');
  });

  it('should list all cars', async () => {
    const response = await request(appUrl)
      .get('/cars/');
    assert.strictEqual(typeof response.body.data, 'object');
  });

  it('should get a car', async () => {
    const response = await request(appUrl)
      .get(`/cars/${this.id}`);
    assert.strictEqual(response.body.name, 'longer than 3');
  });

  it('should delete a car', async () => {
    const response = await request(appUrl)
      .delete(`/cars/${this.id}`);
    assert.strictEqual(response.status, 200);
  });

});
