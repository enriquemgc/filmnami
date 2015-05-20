var Promise = require('promise');
var User = require('../model/user');

var controller = {};

// Controller functions

controller.list = function() {
	return new Promise(function (fulfill, reject) {
		// get all the users
		User.find({}, function (err, users) {
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

module.exports = controller;