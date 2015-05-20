var router = require('express').Router();
var controller = require('../controller/user');

router.route('/users')

.all(function(req, res) {
	res.redirect('/users/0');
});

router.route('/users/:page')

// Get users list
.get(function (req, res) {
	controller.list().then(function(users) {
		res.status(200).json(users);
	});
});

module.exports = router;