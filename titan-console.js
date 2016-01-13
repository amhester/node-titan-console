"use strict";

var argv = require('yargs').argv;
var gremlin = require('gremlin-client');

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
	console.log('sending query...');
	client.execute(query, function(err, results) {
		if (!err) {
			console.log(results);
		} else {
			console.log(err);
		}
		if(!query) {
			promptQuery();
		}
	});	
}

function promptQuery() {
	console.log('Please enter query...');
	process.stdin.resume();
	process.stdin.once('data', function (data) {
		process.stdin.pause();
		console.log('received query...');
		query = data.toString().trim();
		sendQuery();
	});
}