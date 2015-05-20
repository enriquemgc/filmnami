// Load app configuration
var config = require('./config/app');

// Load all dependencies
var express = require('express');
var films = require('./routing/films');
var film = require('./routing/film');
var users = require('./routing/users');
var user = require('./routing/user');

var mongoose = require('mongoose');
var databaseConnection = 'mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.schema;

// Create express app
var app = express();

// Add routing middlewares
app.use(films);
app.use(film);
app.use(users);
app.use(user);

// Connect to database
mongoose.connect(databaseConnection);
mongoose.connection.on('error', function(err) {
  console.error('Database connection error: %s', err);
});
mongoose.connection.on('open', function(callback) {
  console.log('Database connection success');
});

// Start server (debug)
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Filmnami listening at http://%s:%s', host, port);

});