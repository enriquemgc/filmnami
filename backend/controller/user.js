var config = require('../config/app');
var Promise = require('promise');
var Async = require('async');
var User = require('../model/user');

var controller = {};

// Controller functions

controller.list = function(page) {
	return new Promise(function (fulfill, reject) {

		User.find({}).skip(page === 0 ? page : page * config.pagination).limit(config.pagination).exec(function (err, users) {
			if (err) {
				console.error("Error getting users: %s", err);
				reject(err);
			} else {
				console.log("List users: %j", users);
				fulfill(users);
			}
		});
	});
};

controller.get = function (username) {
	return new Promise(function (fulfill, reject) {
		User.findOne({"username": username}, function (err, user) {
			if (err) {
				console.error("Error getting user: %s. %s", username, err);
				reject(err);
			} else {
				console.log("Get user: %j", user);
				fulfill(user);
			}
		});
	});
};

controller.new = function (user) {
	return new Promise(function (fulfill, reject) {
		var newUser = new User(user);
		newUser.save(function (err) {
			if (err) {
				console.error("Error creating the new user: %s", err);
				reject(err);
			} else {
				console.log("New user created");
				fulfill();
			}
		});
	});
};

controller.update = function (username, updatedData) {
	return new Promise(function (fulfill, reject) {
		User.findOneAndUpdate({"username": username}, updatedData, { "new": true }, function (err, user) {
			if (err) {
				console.error("Error updating user: %s. %s", username, err);
				reject(err);
			} else {
				console.log("Updated user: %j", user);
				fulfill(user);
			}
		});
	});
};

controller.delete = function (username) {
	return new Promise(function (fulfill, reject) {
		User.findOneAndRemove({"username": username}, function (err, user) {
			if (err) {
				console.error("Error deleting user: %s. %s", username, err);
				reject(err);
			} else {
				console.log("Deleted user: %j", user);
				fulfill(user);
			}
		});
	});
};

// Get the next user to create a poll
controller.getUserToPoll = function() {
	return new Promise(function (fulfill, reject) {
		User.find({"pollDone":false}).limit(1).sort('idCard').exec(function(err, user) {
			if (!err) {
				// If we don't get any user we should reset the poll state of each one
				if (!user || user.length == 0) {
					User.find({"pollDone":true}).select('username').exec(function(err, users) {
						Async.each(users, function(eachUser, callback) {
							controller.update(eachUser.username, {"pollDone":false}).then(function() {
								callback();
							});
						},
						function(err) {
							if (!err) {
								controller.getUserToPoll().then(function(user) {
									fulfill(user);
								}, function(err) {
									reject(err);
								});
							}
						});
					});
				} else {
					fulfill(user);
				}
			} else {
				reject(err);
			}
		});
	});
};

controller.login = function (username, password) {
	return new Promise(function (fulfill, reject) {

	});
};

module.exports = controller;
