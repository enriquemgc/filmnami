var router = require('express').Router();
var controller = require('../controller/film');

router.route('/films')

.all(function(req, res) {
	res.redirect('/films/0');
});

router.route('/films/:page')

// Get film list
.get(function (req, res) {
	res.send("Films");
});

module.exports = router;