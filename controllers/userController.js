const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    
    if (isPhoto) {
      next(null, true);
    } else {
      next({message: 'wrong file type...'}, false)
    }
  }
}

exports.upload = multer(multerOptions).single('photo');
exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  const fileType = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${fileType}`;

  const photo = await jimp.read(req.file.buffer);
  await photo.resize(600, jimp.AUTO);
  await photo.write(`./static/uploads/${req.body.photo}`);

  next();
}

exports.renderLogin = (req , res) => {
  res.render('login');
}

exports.renderRegister = (req, res) => {
  res.render('register');
}

exports.register = (req, res, next) => {
  console.log('REQ.BODY -->' , req.body);
  var userObject = {
    username: req.body.username,
    locations: [{
      address: req.body.address,
      lat: req.body.location_Lat,
      lng: req.body.location_Lng,
      image: req.body.photo
    }]
  }

  const user = new User(userObject)

  User.register(user, req.body.password , (err, user) => {
    console.log('NEW USER' , user);
    next()
  });
}

exports.addLocation = (req, res) => {
  var locationQuery = {
      address: req.body.address,
      lat: req.body.location_Lat,
      lng: req.body.location_Lng,
      image: req.body.photo
  }

  User.findOne({username: req.user.username})
    .then((obj) => {
      console.log(obj);
      obj.locations.push(locationQuery);
      obj.save()
        .then(function(){
          res.redirect('/')
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    })

  // console.log('ADD LOCATION' , locationQuery);
}

exports.removeLocation = (req, res) => {
  console.log('PARAMS' , req.params);

}

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'failed to log in!',
  successFlash: 'hello',
  successRedirect: '/'
})

exports.logout = (req, res) => {
  req.logout();
  req.flash('success' , 'logged out.')
  res.redirect('/home')
}

exports.editLocation = (req, res) => {
  User.findOne({
    _id: req.params.userid
  })
    .then((user) => {
      var location = user.locations.filter((location) => {
        return location._id == req.params.id
      }).pop();

      res.render('edit' , {
        user: user,
        address: location.address,
        image: location.image,
        id: location.id,
        lat: location.lat,
        lng: location.lng
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.updateLocation = (req, res) => {
  var updateLocation = {
    address: req.body.address,
    lat: req.body.location_Lat,
    lng: req.body.location_Lng,
    image: req.body.photo
  }
  
  User.findOneAndUpdate(
    { "_id": req.params.userid, "locations._id": req.params.id },
    { 
      "$set": {
        "locations.$": updateLocation
    }
  })
  .then((obj) => {
    res.redirect('/');
  })
  .catch((err) => {
    console.log('ERROR EDIT LOCATION' ,err);
  })
}

exports.removeLocation = (req, res) => {
  console.log('DELETE' , req.params);

  User.update(
    { "_id": req.params.userid, "locations._id": req.params.id },
    { $pull : { locations : { "_id": req.params.id } } }, false, false )
  .then((obj) => {
    res.redirect('/');
  })
  .catch((err) => {
    console.log('ERROR remove LOCATION' ,err);
  })
   
}