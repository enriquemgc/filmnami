var router = require('express').Router();
var controller = require('../controller/film');

/*router.route('/film')

// Create a new film
.post(function (req, res) {
	controller.new(req.body).then(function() {
		res.status(200).end();
	},
	function (err) {
		res.status(500).end();
	});
});*/

router.route('/film/:id')

// Get film details
.get(function (req, res) {
	controller.get(req.params.id).then(function(film) {
		res.status(200).json(film);
	},
	function(err) {
		res.status(404).end();
	});
});

/*// Update film details
.put(function (req, res) {
	controller.update(req.params.id, req.body).then(function(film) {
		res.status(200).json(film);
	},
	function(err) {
		res.status(404).end();
	});
})

// Delete an existing film
.delete(function (req, res) {
	controller.delete(req.params.id).then(function(film) {
		res.status(200).json(film);
	},
	function(err) {
		res.status(404).end();
	});
});*/

module.exports = router;