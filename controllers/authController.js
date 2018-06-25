const rp = require('request-promise');
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

exports.renderLogin = function(req , res) {
  res.render('login');
}

exports.register = function(req, res, next) {
  // rp(`https://api.darksky.net/forecast/${process.env.DS_KEY}/${req.body.location_Lat},${req.body.location_Lng}?units=si`)
  //   .then(function(body) {
  //     var data = JSON.parse(body);

  //     var hourly = data.hourly.summary;
  //     var daily = data.daily.summary;
  //     var temp = data.currently.temperature;
  //     var currently = data.currently.summary;

  //     res.render('index', {
  //       loggendIn: true,
  //       userName: req.body.username,
  //       location: req.body.address,
  //       temp: temp,
  //       hourly: hourly,
  //       daily: daily,
  //     });
  //   })
  //   .catch(function(err) {
  //     console.log(err)
  //   })

  // addUserToDB(req.body, req, req)

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
  })
  
}

exports.login = passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: 'failed to log in!',
  successRedirect: '/index'
})

// function addUserToDB(body , res, req) {
//   var userObject = {
//       username: body.username,
//       location: {
//         address: body.address,
//         lat: body.location_Lat,
//         lng: body.location_Lng,
//         image: ''
//       }
//     }

//     const user = new User(userObject)

//     User.register(user, req.body.password , function(err, user) {

//     })
// }