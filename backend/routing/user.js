var router = require('express').Router();

// Handle user id to get all database details before process the request
router.param('id', function (req, res, next, id) {
	
});

router.route('/user/:id')

// Get user details
.get(function (req, res) {
	
})

// Create a new user
.post(function (req, res) {
	
})

// Update user details
.put(function (req, res) {
	
});

module.exports = router;