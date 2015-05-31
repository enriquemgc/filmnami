var router = require('express').Router();
var controller = require('../controller/poll');

router.route('/poll')

// Create a new poll
.post(function (req, res) {
	controller.new(req.body).then(function() {
		res.status(200).end();
	},
	function (err) {
		res.status(500).end();
	});
})

// Get active poll details
.get(function (req, res) {
	controller.get().then(function(poll) {
		res.status(200).json(poll);
	},
	function(err) {
		res.status(404).end();
	});
});

router.route('/poll/:username/:filmid')

// Add vote to a film in the active poll
.put(function (req, res) {
	controller.vote(req.params.username, req.params.filmid).then(function() {
		res.status(200).end();
	},
	function(err) {
		res.status(404).end();
	});
});

module.exports = router;
