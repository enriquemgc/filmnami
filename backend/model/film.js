var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var filmSchema = new Schema({
  imdb: { type: String, required: true },
  votes: Number,
  watched: Boolean
});

// Create a model using it
var Film = mongoose.model('Film', filmSchema);

// Make this available in our Node applications
module.exports = Film;