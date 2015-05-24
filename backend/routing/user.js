var router = require('express').Router();
var controller = require('../controller/user');

router.route('/user')

// Create a new user
.post(function (req, res) {
	controller.new(req.body).then(function() {
		res.status(200).end();
	},
	function (err) {
		res.status(500).end();
	});
});

router.route('/user/:username')

// Get user details
.get(function (req, res) {
	controller.get(req.params.username).then(function(user) {
		res.status(200).json(user);
	},
	function(err) {
		res.status(404).end();
	});
})

// Update user details
.put(function (req, res) {
	controller.update(req.params.username, req.body).then(function(user) {
		res.status(200).json(user);
	},
	function(err) {
		res.status(404).end();
	});
})

// Delete an existing user
.delete(function (req, res) {
	controller.delete(req.params.username).then(function(user) {
		res.status(200).json(user);
	},
	function(err) {
		res.status(404).end();
	});
});

module.exports = router;