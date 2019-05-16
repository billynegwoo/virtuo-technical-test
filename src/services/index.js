const stations = require('./stations/stations.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(stations);
};
