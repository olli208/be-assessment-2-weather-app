
exports.index = (req , res , next) => {

  if (req.user) {
    next()
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