var config = require('../config/app');
var fs = require('fs');
var path = require('path');

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(config.mandrill.apiKey);

var controller = {};

controller.pollWarning = function(to) {
	var htmlBody = fs.readFileSync(path.join(__dirname, '..', 'assets', 'mail.html'), 'utf8');
	var message = {
		"html": htmlBody,
		"subject": config.mandrill.subject,
		"from_email": config.mandrill.from_email,
	    "from_name": config.mandrill.from_name,
	    "to": [{
	            "email": to,
	            "name": "Recipient Name",
	            "type": "to"
	        }]
	};

	mandrill_client.messages.send({"message": message}, function(result) {
	    console.log(result);
	}, function(e) {
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	});
};

module.exports = controller;
