# node-titan-console
A node tool to connect and run scripts against a hosted titandb instance.

##Install
To install run the following: `npm install -g git+https://github.com/amhester/node-titan-console.git`

##Usage
To use, open up a terminal and run `TitanClient [<port> <host> <query>]`. If no flags are specified, then it will enter a repl mode connected to localhost:8182.
You can optionally specify the host, port, and query. To do so, you can use the following command line parameters: `--port`, `--host`, `--query`. Here's an example querying all of the edges in the titandb instance:
`TitanClient --port 8182 --host "http://some.host.here" --query "g.E()"`.
