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

		this.server.get("/", 								this.router.getSprintList.bind(this.router));

		this.server.get("/sprints", 				this.router.getSprintList.bind(this.router));
		this.server.get("/sprints/", 				this.router.getSprintList.bind(this.router));
		this.server.get("/sprints/update", 	this.router.updateAllSprints.bind(this.router));

		this.server.get("/sprint/:id", 				this.router.getSprintById.bind(this.router));
		this.server.get("/sprint/:id/update", this.router.updateSprint.bind(this.router));

	}
	
	start() {
		var self = this;
		var port = 8082;
		this.server.listen(process.env.PORT || port, function () {
			    console.log("Server started @ " + port);
			});
		}
}

module.exports = RestServer;








