"use strict";

var restify = require('restify');
var Router = require('./routes/router.js');

class RestServer {
	
	constructor(model, retriever) {
		this.router = new Router(model, retriever);

		this.server = restify.createServer();
		this.server.use(restify.acceptParser(this.server.acceptable));
		this.server.use(restify.queryParser());
		this.server.use(restify.bodyParser());
		this.server.use(restify.CORS({
		  origins: ['http://localhost:8080'], // defaults to ['*']
		  credentials: true,                 // defaults to false
		  headers: ['x-foo']                 // sets expose-headers
		}));

		this.server.get("/", 						this.router.returnSprintList.bind(this.router));
		this.server.get("/sprints", 		this.router.returnSprintList.bind(this.router));
		this.server.get("/sprint/:id", 	this.router.returnSprintById.bind(this.router));

		this.server.get("/update", 			this.router.startDataUpdate.bind(this.router));
	}
	
	start() {
		var self = this;
		var port = 8081;
		this.server.listen(process.env.PORT || port, function () {
			    console.log("Server started @ " + port);
			});
		}
}

module.exports = RestServer;








