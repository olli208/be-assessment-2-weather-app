var express = require('express');
var router = express.Router();
var request = require('request');
var querystring = require('querystring');

require('dotenv').config(); // secret stuff

// Controller imports
var indexController = require('../controllers/indexController');
var authController = require('../controllers/authController');
var weatherController = require('../controllers/weatherController');
var userController = require('../controllers/userController');

// Oauth
router.get('/login', authController.renderLogin);
router.get('/register', authController.renderRegister);

router.get('/', indexController.index, weatherController.search);
router.get('/home', indexController.home);
router.get('/logout', authController.logout);
router.get('/remove-location/:id', authController.removeLocation);

router.post('/login', authController.login);
router.post('/register', 
authController.upload, 
authController.resize, 
authController.register, 
authController.login);
router.post('/get-weather', weatherController.search);
router.post('/add-location', 
authController.upload, 
authController.resize, 
authController.addLocation);

module.exports = router;