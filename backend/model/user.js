var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  idCard: { type: String, required: true }
});

// Create a model using it
var User = mongoose.model('User', userSchema);

// Make this available in our Node applications
module.exports = User;