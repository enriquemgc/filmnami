var schedule = require('node-schedule');
var Poll = require('../controller/poll');
var User = require('../controller/user');
var Mail = require('../controller/mail');

var functions = {};

functions.start = function () {
	// If is the 1st day of the month we should warning the next user to create the new one
	schedule.scheduleJob('*/1 * * * *', function(){
	    User.getUserToPoll().then(function(user) {
			Mail.pollWarning(user[0].email);
		});
		console.log('Cron executed');
	});
};

module.exports = functions;
