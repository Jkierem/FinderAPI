'use strict';
module.exports = (app) =>{
  var poi = require('../controllers/poiController')

  app.route('/pois')
    .get(poi.getPois)
    .post(poi.createPoi)

  app.route('/pois/:poiId')
    .put(poi.updatePoi)
    .get(poi.getPoiById)
    .delete(poi.deletePoi)

  app.route('/pois/info/:name')
    .get(poi.getPoiByName)

}
