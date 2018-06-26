exports.add = (req, res) => {
  var locationQuery = {
      address: req.body.address,
      lat: req.body.location_Lat,
      lng: req.body.location_Lng,
  }

  console.log(locationQuery);
}