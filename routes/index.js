var express = require('express');
var router = express.Router();
var request = require('request');
var querystring = require('querystring');

require('dotenv').config(); // secret stuff

// Controller imports
var indexController = require('../controllers/indexController');

// Oauth
router.get('/', indexController.index);
router.post('/new-user', indexController.newUser);

module.exports = router;