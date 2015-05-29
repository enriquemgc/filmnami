var config = require('../config/app');

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(config.mandrill.apiKey);

var controller = {};

controller.send = function() {
	
};

module.exports = controller;