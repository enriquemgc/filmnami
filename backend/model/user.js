var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config/app');

// Create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  admin: Boolean,
  idCard: { type: String, required: true },
  pollDone: Boolean,
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
  }

  // if admin doesn't exist, set to false
  if (!this.admin) {
    this.admin = false;
  }

  // but if the username is equal to the allowed admin username, we set to true
  if (this.username === config.admin) {
    this.admin = true;
  }

  // if pollDone doesn't exist, set to false
  if (!this.pollDone) {
    this.pollDone = false;
  }

  // if name doesn't exist, set the same value as username
  if (!this.name) {
    this.name = this.username;
  }

  next();
});

// Create a model using it
var User = mongoose.model('User', userSchema);

// Make this available in our Node applications
module.exports = User;
