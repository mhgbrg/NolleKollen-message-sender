var system = require('system');
var fs = require('fs');
var casper = require('casper').create();

function takeScreenshot(casper) {
	casper.capture('screenshot.png');
	console.log('Screenshot captured as screenshot.png');
}

function sendMessage(username, password, message) {
	console.log('Sending message: ', message);

	console.log('Opening login page...')

	casper.start('http://nollekollen.se/controlpanel/pages/login.php', function () {
		console.log('Login page loaded!');
		console.log('Filling out login form...');
		this.fill('form', {
	    	'username': username,
	    	'password': password
	    }, true);
	    console.log('Logging in...');
	});

	casper.then(function() {
		if (this.getCurrentUrl() !== 'http://nollekollen.se/controlpanel/pages/start.php') {
			console.log('Login unsuccessful');
			takeScreenshot(this);
			this.exit();
		} else {
			console.log('Login successful!');
			console.log('Going to message page...');
		}
	});

	casper.thenOpen('http://nollekollen.se/controlpanel/pages/messages.php', function () {
		console.log('Message page loaded!');
		console.log('Filling out message form...');
		this.fill('#compose-modal form', {
			'message': message
		}, true);
		console.log('Sending message...');
	});

	casper.then(function () {
		console.log('Message sent!');
		takeScreenshot(this);
	});

	casper.run();
}

if (system.args.length !== 7) {
	console.log('Usage:');
	console.log('\tcasperjs send_message.js <username> <password> <path to message file>');
	casper.exit();
} else {
	var username = system.args[4];
	var password = system.args[5];

	var messagePath = system.args[6];
	try {
		var message = fs.read(messagePath);
		sendMessage(username, password, message);
	} catch(err) {
		console.log(err);
		casper.exit();
	}
}
