"use strict";

var settings = require("../settings.js")
var RestClient = require("./restClient/restClient.js");

var SprintRetriever = require('./sprintRetriever.js');




// var jsonfile = require('jsonfile');
// var settings = require('./../app/js/settings.js').appSettings;
// var JiraDataDownloader = require('./restclient.js').JiraDataDownloader;
// var DataHandler = require('./datahandler.js').DataHandler;

class DataRetriever {

	constructor(model) {
		this.dataModel = model;
		this.restClient = new RestClient();
		this.sprintQueue = [];
	}

	start() {
    console.log('');
    console.log('JIRA: Login attemtp..');
		this.restClient.login(this.retrieveData.bind(this));
	}

	// START DATA SCRAPING
	retrieveData() {
		console.log('');
		if (settings.defaultUpdateBatchSize == 0) {
			console.log('JIRA: Retrieving all sprints.');
		} else {
			console.log('JIRA: Retrieving recent ' + settings.defaultUpdateBatchSize + ' sprints.');
		}
		
		for (var i=0; i<=settings.sprints.length-1; i++) {
      var sprint = settings.sprints[i];
			var queueItem = new SprintRetriever(sprint, this.restClient, this.dataModel);
			if (this.sprintQueue.length > 0) queueItem.setSuccessor(this.sprintQueue[0]);
			this.sprintQueue.unshift(queueItem);
			if (settings.defaultUpdateBatchSize && (settings.defaultUpdateBatchSize <= this.sprintQueue.length)) break;
		}
		this.sprintQueue[0].retrieveSprint();
	}

	

}

module.exports = DataRetriever;


