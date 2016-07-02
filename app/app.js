"use strict";

var RestServer = require('./server/server.js');
var model = require('./model/model.js');
var DataRetriever = require('./dataRetriever/dataRetriever.js');
var Scheduler = require('./scheduler/scheduler.js');


class Application {

	constructor() {
		this.dataModel = model;
		this.dataRetriever = new DataRetriever(this.dataModel);

		this.restServer = new RestServer(this.dataModel, this.dataRetriever);
		this.scheduler = new Scheduler();
	}

	startServer() {

		// console.log("this.jiraCred:");
		// console.log(this.jiraCred);

		// this.scheduler.scheduleJob('every 10 min', this.startDataRetriever.bind(this));
		this.restServer.start();
	}

	startDataRetriever() {
		this.dataRetriever.start();
	}
}

var app = new Application();

module.exports = app;


