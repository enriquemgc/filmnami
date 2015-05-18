var router = require('express').Router();

// Handle film id to get all database details before process the request
router.param('id', function (req, res, next, id) {
	
});

router.route('/film/:id')

// Get film details
.get(function (req, res) {
	
})

// Create a new film
.post(function (req, res) {
	
})

// Update film details
.put(function (req, res) {
	
});

module.exports = router;