"use strict";

var restify = require('restify');
var ReturnSprintList = require('./routes/returnSprintList.js');
var ReturnSprintById = require('./routes/returnSprintById.js');


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

		this.server.get("/", ReturnSprintList);
		this.server.get("/sprints", ReturnSprintList);
		this.server.get("/sprint/:id", ReturnSprintById);
	}
	
	start() {
		var self = this;
		this.server.listen(process.env.PORT || this.serverPort, function () {
			    console.log("Server started @ " + self.serverPort);
			});
		}
}

module.exports = RestServer;








