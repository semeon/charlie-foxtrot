"use strict";

var restify = require('restify');

class RestServer {
	
	constructor(port) {
		this.serverPort = port;
		this.server = restify.createServer();
		this.server.use(restify.acceptParser(this.server.acceptable));
		this.server.use(restify.queryParser());
		this.server.use(restify.bodyParser());
		this.server.use(restify.CORS({
		  origins: ['http://localhost:8080'], // defaults to ['*']
		  credentials: true,                 // defaults to false
		  headers: ['x-foo']                 // sets expose-headers
		}));
 
		this.server.get("/products", function (req, res, next) {
		    res.send(data);
		    return next();
		});

		this.server.get('/product/:id', function (req, res, next) {
			var id = req.params.id;
			var result = data[id];
		  res.send(result);
		  return next();
		});
	}
	
	start() {
		var self = this;
		this.server.listen(this.serverPort, function () {
			    console.log("Server started @ " + self.serverPort);
			});
		}
}

module.exports = RestServer;








