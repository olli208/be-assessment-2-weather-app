
exports.index = function(req , res) {
  console.log('REQ USERRRRRRR' , req.user);

  if (req.user) {
    res.render('index', {
      user: req.user
    });
  } else {
    res.render('index', {
      user: req.user
    });
  }

}