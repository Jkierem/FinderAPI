var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const kinds = ["Cafeteria","Camino","Entrada","Salida","Entrada/Salida","Rampa","Escalera"]

ArcSchema = new Schema({
  name: {type: String , required:true},
  cost: {
    type: Number ,
    set: (v) => (Math.round(v)),
    default: 1,
    isStair: {type: Boolean}
  }
})

PoiSchema = new Schema({
  name: {type: String , required: true },
  kind: {type: String, enum:kinds, required: true},
  neighbors: [ArcSchema]
})

module.exports = mongoose.model('Poi', PoiSchema)
