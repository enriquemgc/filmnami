var config = require('../config/app');
var Promise = require('promise');
var Poll = require('../model/poll');
var User = require('../model/poll');
var Film = require('../model/film');

var controller = {};

// Controller functions

controller.get = function () {
	return new Promise(function (fulfill, reject) {
		
	});
};

controller.new = function (films) {
	return new Promise(function (fulfill, reject) {
		/* {
  films: [{
  	film: {
  		type: mongoose.Schema.Types.ObjectId,
      ref: 'Film'
  	},
  	votes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }],
  active: Boolean,
  created_at: Date,
  updated_at: Date,
  close_at: Date
} */

		
	});
};

controller.vote = function (username, filmId) {
	return new Promise(function (fulfill, reject) {
		
	});
};

controller.update = function (film) {
	return new Promise(function (fulfill, reject) {
		
	});
};

module.exports = controller;