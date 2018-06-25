var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var diff = require('deep-diff').diff; 
var session = require('express-session');
var flash = require('connect-flash');
var helpers = require('./helpers');
var mongoose = require('mongoose');

var app = express();
var server = require('http').createServer(app);

require('dotenv').config(); // secret stuff

// Setup and middleware
app.set('view engine' , 'ejs')
  .set('views' , path.join(__dirname, 'views'))
  .use(express.static('static'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ 
    extended: false 
  }))
  .use(compression({
    threshold: 0, 
    filter: () => true}))
  .use(session({ 
    secret: 'zoGeheim', 
    resave: false, 
    saveUninitialized: true
  }))

app.use(function (req, res, next) {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  next();
})

// My Routes
app.use('/', require('./routes/index'));

server.listen(process.env.PORT, function (){
    console.log('server is running on: ' + process.env.PORT);
})
