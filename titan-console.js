#!/usr/bin/env node
'use strict';
var argv = require('yargs').argv;
var gremlin = require('gremlin-client');
var Spinner = require('cli-spinner').Spinner;

let port = argv.port || 8182;
let host = argv.host || 'localhost';

if(argv.help) {
	console.log(
		'\n' +
		'\tThe available options for the TitanClient CLI tool are as follows:\n' +
			'\t\t--port a number for the port you want to connect to (defaults to 8182)\n' +
			'\t\t--host a string for the host address you want to connect to (defaults to localhost)\n' +
			'\t\t--query a string that contains a query you wish to run against titan (if not provided, will enter REPL mode)\n' +
		'\n\tYou can also pipe a txt file into this command which will then be used as the query to execute.'
	);
	process.exit(1);
}

var client = gremlin.createClient(port, host);

if(argv.query) {
	sendQuery(argv.query);
	process.exit(1);
} else {
	promptQuery();
}

function sendQuery(query) {
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
		let query = data.toString().trim();
		sendQuery(query);
	});
}

