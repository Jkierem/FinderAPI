'use strict';
module.exports = (app) => {
  var building = require('../controllers/buildingController');

  app.route('/buildings')
    .post(building.createBuilding)
    .get(building.getBuildings)

  app.route('/buildings/:buildId')
    .put(building.updateBuilding)
    .delete(building.deleteBuilding)
    .get(building.getBuildingById)

  app.route('/buildings/info/:name')
    .get(building.getBuildingByName)
}