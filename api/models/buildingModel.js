var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const kinds = ["Cafeteria","Camino","Entrada","Salida","Entrada/Salida","Rampa","Escalera"]

innerPoiSchema = new Schema({
  name: {type: String},
  type: {type: String, enum:kinds, required: true},
  description: {type: String}
})

BuildingSchema = new Schema({
  name: {type: String , unique: true},
  pois: [innerPoiSchema]
})

module.exports = mongoose.model('Building' , BuildingSchema);
