const rp = require('request-promise');

exports.search = (req, res) => {

  var locationQuery = getLocation(req);

  if (!req.user) {
    // When not logged in, there is only one location so do this
    rp(`https://api.darksky.net/forecast/${process.env.DS_KEY}/${locationQuery.lat},${locationQuery.lng}?units=si`)
    .then(function(body) {
      var data = JSON.parse(body);

      var address = locationQuery.address;
      var hourly = data.hourly.summary;
      var daily = data.daily.summary;
      var temp = data.currently.temperature;
      var currently = data.currently.summary;

      res.render('index', {
        user: req.user,
        address: address,
        temp: temp,
        hourly: hourly,
        daily: daily,
      });
    })
    .catch(function(err) {
      console.log(err)
    });
  } else {
    // When user is logge in there can be several locations so promise every location...

    var promises = locationQuery.map(function(obj) {
      return rp(`https://api.darksky.net/forecast/${process.env.DS_KEY}/${obj.lat},${obj.lng}?units=si`)
        .then(function(body) {
          var data = JSON.parse(body);

          var weatherData = {
            address: obj.address,
            hourly: data.hourly.summary,
            daily: data.daily.summary,
            temp: data.currently.temperature,
            currently: data.currently.summary,
          }

          return weatherData;
        })
        .catch(function(err) {
          console.log('couldnt get weather', err);
          throw err
        });
    });

    return Promise.all(promises)
      .then(function (results) {
        // When we queried every location render the data we returned...

        res.render('index', {
          user: req.user,
          locations: results
        });

      })
      .catch(err => {
        console.log(err)
      });
    
  }
}

function getLocation(req) {
  console.log('USER -->' , req.user)

  if (req.user) {
    return req.user.locations
  } else {
    return {
      address: req.body.address,
      lat: req.body.location_Lat,
      lng: req.body.location_Lng,
    }
  }
}


