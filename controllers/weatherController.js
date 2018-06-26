const rp = require('request-promise');

exports.search = (req, res , err) => {

  var locationQuery = {
    address: req.body.address || req.user.address,
    lat: req.body.location_Lat || req.user.location.lat,
    lng: req.body.location_Lng || req.user.location.lng,
  }

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
}


