var express = require('express');
var router = express.Router();
var request = require('request');
var querystring = require('querystring');

require('dotenv').config(); // secret stuff

// Controller imports
var indexController = require('../controllers/indexController');
var userController = require('../controllers/userController');
var weatherController = require('../controllers/weatherController');
var userController = require('../controllers/userController');

// Oauth
router.get('/login', userController.renderLogin);
router.get('/register', userController.renderRegister);

router.get('/', indexController.index, weatherController.search);
router.get('/home', indexController.home);
router.get('/logout', userController.logout);
router.get('/remove-location/:id', userController.removeLocation);
router.get('/:userid/edit/:id', userController.editLocation);

router.post('/login', userController.login);

router.post('/register', 
userController.upload, 
userController.resize, 
userController.register, 
userController.login);

router.post('/get-weather', weatherController.search);

router.post('/add-location', 
userController.upload, 
userController.resize, 
userController.addLocation);

router.post('/:userid/edit/:id', 
userController.upload, 
userController.resize, 
userController.updateLocation);

module.exports = router;