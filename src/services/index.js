const stations = require('./stations/stations.service.js');
const cars = require('./cars/cars.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(stations);
  app.configure(cars);
};
