'use strict';

/**
 * Module dependencies
 */
var plandersPolicy = require('../policies/planders.server.policy'),
  planders = require('../controllers/planders.server.controller');

module.exports = function(app) {
  // Planders Routes
  app.route('/api/planders').all(plandersPolicy.isAllowed)
    .get(planders.list)
    .post(planders.create);

  app.route('/api/planders/:planderId').all(plandersPolicy.isAllowed)
    .get(planders.read)
    .put(planders.update)
    .delete(planders.delete);

  // Finish by binding the Plander middleware
  app.param('planderId', planders.planderByID);
};
