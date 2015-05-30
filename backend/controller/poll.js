var config = require('../config/app');
var Promise = require('promise');
var Poll = require('../model/poll');
var User = require('./user');
var Film = require('./film');

var controller = {};

// Controller functions

controller.get = function () {
	return new Promise(function (fulfill, reject) {

	});
};

controller.new = function (films) {
	return new Promise(function (fulfill, reject) {
		var storedFilms = [];

		// store each film for the poll before create it
		films.forEach(function(film, index) {
			Film.new(film).then(function(storedFilm) {
				storedFilms.push(storedFilm);

				// if have finished storing the films
				if (index === films.length - 1) {
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
