var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

BuildingSchema = new Schema({
  name: {type: String , required: true},
  pois: { type:Schema.Types.Mixed }
})

module.exports = mongoose.model('Building' , BuildingSchema);
