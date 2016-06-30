"use strict";

var RestServer = require('./server/server.js');
var model = require('./model/model.js');
var DataRetriever = require('./dataRetriever/dataRetriever.js');

class Application {

	constructor() {
		this.dataModel = model;
		this.dataRetriever = new DataRetriever(this.dataModel);
		this.restServer = new RestServer(8081);
	}

	startServer() {
		this.restServer.start();
		// this.dataRetriever.start();
	}

	startDataRetriever() {
		this.dataRetriever.start();
	}


}

var app = new Application();

module.exports = app;


