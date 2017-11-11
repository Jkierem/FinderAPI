var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

UserSchema = new Schema({
  fullname: {type: String , required: true },
  nickname: {type: String , unique: true},
  email: {type : String , unique: true},
  password: {type: String , required:true },
  additionalData: { type: Schema.Types.Mixed },
  creation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User' , UserSchema);
