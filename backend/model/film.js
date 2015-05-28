var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var filmSchema = new Schema({
  imdb: { type: String, required: true, unique: true },
  watched: Boolean,
  created_at: Date,
  updated_at: Date
});

filmSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  
  // if watched doesn't exist, set to false
  if (!this.watched) {
    this.watched = false;
  }
  
  // if imdb is an url change to id
  var urlRegExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/g;
  if (urlRegExp.test(this.imdb)) {
    // remove the last / if exist
    var lastCharPosition = this.imdb.length - 1;
    if (this.imdb.charAt(lastCharPosition) === "/") {
      this.imdb = this.imdb.slice(0, lastCharPosition);
    }
    
    // extract imdb id from the url
    this.imdb = this.imdb.slice(this.imdb.lastIndexOf("/") + 1);
    console.log("id imdb", this.imdb);
  }

  next();
});

// Create a model using it
var Film = mongoose.model('Film', filmSchema);

// Make this available in our Node applications
module.exports = Film;