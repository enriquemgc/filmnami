var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timeUtil = require('../util/time');
var config = require('../config/app');

// Create a schema
var pollSchema = new Schema({
  films: [{
  	film: {
  		type: mongoose.Schema.Types.ObjectId,
        ref: 'Film'
  	},
  	votes: [{
          user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
          },
          date: Date
    }]
  }],
  active: Boolean,
  created_at: Date,
  updated_at: Date,
  close_at: Date
});

pollSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
  }

  // if close_at doesn't exist, add to that field
  if (!this.close_at) {
    // Get last wednesday of the current month
    var lastWednesday = timeUtil.lastWeekdayOfMonth(3);

    // Substract x days to the limit to vote in the poll
    this.close_at = timeUtil.substract(config.pollLimit, 'days', lastWednesday);
  }

  // if active doesn't exist, set to false
  if (!this.active) {
    this.active = false;
  }

  // initialize votes for each film in the poll
  if (this.films && this.films.length > 0) {
      this.films.forEach(function(film) {
         film.votes = [];
      });
  }

  next();
});

// Create a model using it
var Poll = mongoose.model('Poll', pollSchema);

// Make this available in our Node applications
module.exports = Poll;
