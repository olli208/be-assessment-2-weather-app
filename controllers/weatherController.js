const rp = require('request-promise');

exports.search = (req, res) => {
  rp(`https://api.darksky.net/forecast/${process.env.DS_KEY}/${req.body.location_Lat},${req.body.location_Lng}?units=si`)
  .then(function(body) {
    var data = JSON.parse(body);

    var hourly = data.hourly.summary;
    var daily = data.daily.summary;
    var temp = data.currently.temperature;
    var currently = data.currently.summary;

    res.render('index', {
      loggendIn: true,
      username: req.body.username,
      location: req.body.address,
      temp: temp,
      hourly: hourly,
      daily: daily,
    });
  })
  .catch(function(err) {
    console.log(err)
  });
}


