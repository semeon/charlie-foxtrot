"use strict";

var settings = require("../settings.js")
var RestClient = require("./restClient/restClient.js");

var SprintRetriever = require('./sprintRetriever.js');

var DataModel = require('../model/model.js');




// var jsonfile = require('jsonfile');
// var settings = require('./../app/js/settings.js').appSettings;
// var JiraDataDownloader = require('./restclient.js').JiraDataDownloader;
// var DataHandler = require('./datahandler.js').DataHandler;

class DataRetriever {

	constructor() {
		this.dataStorage = new DataModel();
		this.restClient = new RestClient();
		this.sprintQueue = [];
	}

	start() {
    console.log('');
    console.log('JIRA: (Step 1) Login attemtp..');
		this.restClient.login(this.retrieveData.bind(this));
	}

	// START DATA SCRAPING
	retrieveData() {
		console.log('');
		console.log('JIRA: (Step 2) Retrive sprint data.');
		for (var i=settings.sprints.length-1; i>=0; i--) {
      var sprint = settings.sprints[i];
			var queueItem = new SprintRetriever(sprint, this.restClient, this.dataStorage);
			if (this.sprintQueue.length > 0) queueItem.setSuccessor(this.sprintQueue[0]);
			this.sprintQueue.unshift(queueItem);
		}
		this.sprintQueue[0].retrieveSprint();
	}

	

}

module.exports = DataRetriever;


