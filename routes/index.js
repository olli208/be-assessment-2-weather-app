var express = require('express');
var router = express.Router();
var request = require('request');
var querystring = require('querystring');

require('dotenv').config(); // secret stuff

// Controller imports
var indexController = require('../controllers/indexController');
var authController = require('../controllers/authController');

// Oauth
router.get('/', authController.renderLogin);
router.get('/index', indexController.index);

router.post('/register', authController.register, authController.login);

module.exports = router;