var schedule = require('node-schedule');
var controller = require('../controller/poll');
var mail = require('../controller/mail');

var functions = {};

functions.start = function () {
	// If is the 1st day of the month we should deactivate the previous poll and warning the 
	// next user to create the new one
	schedule.scheduleJob('*/1 * * * *', function(){
	    console.log('The answer to life, the universe, and everything!');
	});
};

module.exports = functions;