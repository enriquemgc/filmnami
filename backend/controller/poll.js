var config = require('../config/app');
var Promise = require('promise');
var Async = require('async');
var Poll = require('../model/poll');
var User = require('./user');
var Film = require('./film');

var controller = {};

// Controller functions
// Get active poll
controller.get = function () {
	return new Promise(function (fulfill, reject) {
		Poll.findOne({"active": true}, function (err, poll) {
			if (err) {
				console.error("Error getting poll. %s", err);
				reject(err);
			} else {
				console.log("Get poll: %j", poll);
				fulfill(poll);
			}
		});
	});
};

controller.new = function (films) {
	return new Promise(function (fulfill, reject) {
		var storedFilms = [];

		Async.each(films, function(film, callback) {
			Film.new(film).then(function(storedFilm) {
				storedFilms.push(storedFilm);
				callback();
			});
		},
		function(err) {
			if (!err) {
				// create the poll
				var newPoll = new Poll();
				newPoll.active = true;

				// and add the films reference
				storedFilms.forEach(function(elem) {
					newPoll.films.push({
						film: elem._id
					});
				});

				// save a new poll
				newPoll.save(function(err) {
					if (err) {
						console.error("Error creating the new poll: %s", err);
						reject(err);
					} else {
						console.log("New poll created");
						fulfill(newPoll);
					}
				});
			}
		});
	});
};

// Vote active poll
controller.vote = function (username, filmId) {
	return new Promise(function (fulfill, reject) {

	});
};

// Update active poll
controller.update = function (updatedData) {
	return new Promise(function (fulfill, reject) {
		controller.get().then(function(poll) {
			Film.findByIdAndUpdate(poll._id, updatedData, { "new": true }, function(err, poll) {
				if (err) {
					console.error("Error updating poll: %s. %s", poll, err);
					reject(err);
				} else {
					console.log("Updated poll: %j", poll);
					fulfill(poll);
				}
			});
		});
	});
};

module.exports = controller;
