var router = require('express').Router();

router.route('/films')

// Get film list
.get(function (req, res) {
	res.send('hello world');
});

module.exports = router;