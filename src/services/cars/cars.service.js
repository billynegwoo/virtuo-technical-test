// Initializes the `cars` service on path `/cars`
const createService = require('feathers-mongoose');
const createModel = require('../../models/cars.model');
const hooks = require('./cars.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/cars', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('cars');

  service.hooks(hooks);
};
