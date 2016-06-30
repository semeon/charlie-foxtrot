"use strict";

var jsonfile = require('jsonfile');
var settings = require("../settings.js")

var DataProcessor = require('./processor/dataProcessor.js');
var DataStorage = require('./storage/dataStorage.js');


class Model {

	constructor() {
		this.rawData = {};
		this.rawData.sprints = {};
		
		this.dataProcessor = new DataProcessor();
		this.storage = new DataStorage();

	}

	addSprintData(sprint, rawSprintData) {
		var sprintReport = this.dataProcessor.processSprint(sprint, rawSprintData);
		this.storage.saveSprint(sprintReport);		
	}

	getSprintList() {
		return this.storage.getSprints();
	}
}

var model = new Model();

module.exports = model;


