var config = require('../config/app');
var Promise = require('promise');
var Film = require('../model/film');

var controller = {};

// Controller functions

controller.list = function(page) {
	return new Promise(function (fulfill, reject) {

		Film.find({}).skip(page === 0 ? page : page * config.pagination).limit(config.pagination).exec(function (err, films) {
			if (err) {
				console.error("Error getting films: %s", err);
				reject(err);
			} else {
				console.log("List films: %j", films);
				fulfill(films);
			}
		});
	});
};

controller.get = function (id) {
	return new Promise(function (fulfill, reject) {
		Film.findOne({"imdb": id}, function (err, film) {
			if (err || !film) {
				console.error("Error getting film: %s. %s", id, err);
				reject(err);
			} else {
				console.log("Get film: %j", film);
				fulfill(film);
			}
		});
	});
};

controller.new = function (film) {
	return new Promise(function (fulfill, reject) {
		controller.get(film.imdb).then(function(storedFilm) {
				fulfill(storedFilm);
		},
		function(err) {
			var newFilm = new Film(film);
			newFilm.save(function (err) {
				if (err) {
					console.error("Error creating the new film: %s", err);
					reject(err);
				} else {
					console.log("New film created");
					fulfill(newFilm);
				}
			});
		});
	});
};

controller.update = function (id, updatedData) {
	return new Promise(function (fulfill, reject) {
		Film.findOneAndUpdate({"imdb": id}, updatedData, { "new": true }, function (err, film) {
			if (err) {
				console.error("Error updating film: %s. %s", id, err);
				reject(err);
			} else {
				console.log("Updated film: %j", film);
				fulfill(film);
			}
		});
	});
};

controller.delete = function (id) {
	return new Promise(function (fulfill, reject) {
		Film.findOneAndRemove({"imdb": id}, function (err, film) {
			if (err) {
				console.error("Error deleting film: %s. %s", id, err);
				reject(err);
			} else {
				console.log("Deleted film: %j", film);
				fulfill(film);
			}
		});
	});
};

module.exports = controller;
