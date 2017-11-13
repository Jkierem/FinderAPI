'use strict';
module.exports = (app) => {
  var building = require('../controllers/buildingController');
  var mixed = require('../controllers/mixedController');

  app.route('/buildings')
    .post(building.createBuilding)
    .get(building.getBuildings)

  app.route('/buildings/:buildId')
    .put(building.updateBuilding)
    .delete(building.deleteBuilding)

  app.route('/buildings/info')
    .post(building.getBuildingByName)

  app.route('/list')
    .get(mixed.getUsefulPois)
}
