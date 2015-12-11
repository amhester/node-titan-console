"use strict";

var argv = require('yargs').argv;
var gremlin = require('gremlin-client');

let port = argv.port || 8182;
let host = argv.host || 'localhost';
let query = argv.query || 'g.V()';

var client = gremlin.createClient(port, host);

client.execute(query, function(err, results) {
    if (!err) {
        console.log(results);
    } else {
        console.log(err);
    }
    process.exit(1);
});