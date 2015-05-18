var express = require('express');
var app = express();

var films = require('./routing/films');
var film = require('./routing/film');
var users = require('./routing/users');
var user = require('./routing/user');

// Add routing middlewares
app.use(films);
app.use(film);
app.use(users);
app.use(user);

// Start server (debug)
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});