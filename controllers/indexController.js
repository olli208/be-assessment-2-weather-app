var rp = require('request-promise');
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.index = function(req , res) {
  res.render('index', {
    loggendIn: false
  });
}

exports.newUser = function(req, res) {
  req.session.userName = req.body.username;
  req.session.location = req.body.address;
  req.session.location = req.body.location_Lat;
  req.session.location = req.body.location_Lng;

  rp(`https://api.darksky.net/forecast/${process.env.DS_KEY}/${req.body.location_Lat},${req.body.location_Lng}?units=si`)
    .then(function(body) {
      var data = JSON.parse(body);

      console.log(data)

      var hourly = data.hourly.summary;
      var daily = data.daily.summary;
      var temp = data.currently.temperature;
      var currently = data.currently.summary;

      res.render('index', {
        loggendIn: true,
        userName: req.body.username,
        location: req.body.address,
        temp: temp,
        hourly: hourly,
        daily: daily,
      });
    })
    .catch(function(err) {
      console.log(err)
    })

  addUserToDB(req.body, req, req)
  
}

function addUserToDB(body , res, req) {
  var userObject = {
      username: body.username,
      location: {
        address: body.address,
        lat: body.location_Lat,
        lng: body.location_Lng,
        image: ''
      }
    }

    const user = new User(userObject)
    // User.findOneAndUpdate(
    //   {'username': body.username},
    //   userObject,
    //   {upsert: true, new: true}
    // ).then(body => {
    //   console.log('NEW USER!!' , body);
      
    // })

    User.register(user, req.body.password , function(err, user) {

    })
}