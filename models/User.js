var mongoose = require('mongoose');
var passportLocalMongooes = require('passport-local-mongoose');
mongoose.Promise = global.Promise;

var locationSchema = new mongoose.Schema({
  address: String,
  lat: Number,
  lng: Number,
  image: String
})

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  locations: [locationSchema]
})

userSchema.plugin(passportLocalMongooes , {usernameField: 'username'})

module.exports = mongoose.model('User' , userSchema);