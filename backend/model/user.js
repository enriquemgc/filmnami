var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  idCard: { type: String, required: true },
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