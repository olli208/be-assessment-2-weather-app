
exports.index = (req , res , next) => {
  console.log('REQ USERRRRRRR' , req.user);

  if (req.user) {
    next()
    // res.render('index', {
    //   user: req.user
    // });
  } else {
    res.render('index', {
      user: req.user,
      address: undefined
    });
  }
}

exports.home = (req, res) => {
  res.render('index', {
    user: req.user,
    address: undefined
  });
}