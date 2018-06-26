const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

exports.renderLogin = function(req , res) {
  res.render('login');
}

exports.register = function(req, res, next) {
  var userObject = {
    username: req.body.username,
    location: {
      address: req.body.address,
      lat: req.body.location_Lat,
      lng: req.body.location_Lng,
      image: ''
    }
  }

  const user = new User(userObject)

  User.register(user, req.body.password , function(err, user) {
    console.log(user);
    next()
  });

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