var config = require('../config/app');
var Promise = require('promise');
var Async = require('async');
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

controller.vote = function (username, filmId) {
	return new Promise(function (fulfill, reject) {

	});
};

controller.update = function (film) {
	return new Promise(function (fulfill, reject) {

	});
};

module.exports = controller;
