'use strict'
var argv = require('yargs').argv;
var gremlin = require('gremlin-client');
var Spinner = require('cli-spinner').Spinner;


let port = argv.port || 8182;
let host = argv.host || 'localhost';
let query = argv.query;

var client = gremlin.createClient(port, host);

if(query) {
	sendQuery();
	process.exit(1);
} else {
	promptQuery();
}

function sendQuery() {
	console.log('\n');
	var spinner = new Spinner('processing.. %s');
	spinner.setSpinnerString(0);
	spinner.start();
	client.execute(query, function(err, results) {
		spinner.stop(true);
		if (!err) {
			console.log(results);
		} else {
			console.log(err);
		}
		promptQuery();
	});
}

function promptQuery() {
	console.log('\n\nPlease enter query...');
	process.stdin.resume();
	process.stdin.once('data', function (data) {
		process.stdin.pause();
		query = data.toString().trim();
		sendQuery();
	});
}

