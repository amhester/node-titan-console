# node-titan-console
A node tool to connect and run scripts against a hosted titandb instance.

##Usage
To use the the titan-console you can run `node titan-console.js` in a terminal of your choice. If no flags are specified, then it will enter a repl mode connected to localhost:8182.
You can optionally specify the host, port, and query. To do so, you can use the following command line parameters: `--port`, `--host`, `--query`. Here's an example querying all of the edges in the titandb instance:
`node titan-console.js --port 8182 --host "http://some.host.here" --query "g.E()"`.
