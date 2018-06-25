var mongoose = require('mongoose');
var passportLocalMongooes = require('passport-local-mongoose');
mongoose.Promise = global.Promise;

// The models for the database will be here.
var userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  location: {
    address: String,
    lat: Number,
    lng: Number,
    image: String
  }
})

userSchema.plugin(passportLocalMongooes , {usernameField: 'username'})

module.exports = mongoose.model('User' , userSchema);