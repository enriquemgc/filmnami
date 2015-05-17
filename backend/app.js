var express = require('express');
var app = express();

var films = require('./routing/films');

// Add routing middlewares
app.use(films);

// Start server (debug)
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});