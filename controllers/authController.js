const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

exports.renderLogin = function(req , res) {
  res.render('login');
}

exports.renderRegister = (req, res) => {
  res.render('register');
}

exports.register = function(req, res, next) {
  console.log('REGISTER BODY' , req.body)
  var userObject = {
    username: req.body.username,
    locations: [{
      address: req.body.address,
      lat: req.body.location_Lat,
      lng: req.body.location_Lng,
      image: ''
    }]
  }

  const user = new User(userObject)

  User.register(user, req.body.password , function(err, user) {
    console.log('NEW USER' , user);
    next()
  });
}

exports.addLocation = (req, res) => {
  var locationQuery = {
      address: req.body.address,
      lat: req.body.location_Lat,
      lng: req.body.location_Lng,
  }

  console.log('ADD LOCATION' , locationQuery);
}

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'failed to log in!',
  successFlash: 'welcome back',
  successRedirect: '/'
})

exports.logout = (req, res) => {
  req.logout();
  req.flash('success' , 'logged out.')
  res.redirect('/home')
}