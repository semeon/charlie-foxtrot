"use strict";

var RestServer = require('./server/server.js');
var Model = require('./model/model.js');
var DataRetriever = require('./dataRetriever/dataRetriever.js');

class Application {

	constructor() {
		this.restServer = new RestServer(8081);
		this.dataModel = new Model();
		this.dataRetriever = new DataRetriever(this.dataModel);

	}

	start() {
		//	this.restServer.start();
		this.dataRetriever.start();

	}
}

module.exports = Application;


