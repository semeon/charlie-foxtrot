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
		this.scope = null;
	}

	start(id) {
    console.log('');
    console.log('JIRA: Login attemtp..');
		if (id) this.scope = id;
		this.restClient.login(this.retrieveData.bind(this));
	}

	// START DATA SCRAPING
	retrieveData() {
		console.log('');
		console.log('JIRA: Retrieving all sprints.');
		
		for (var i=0; i<=settings.sprints.length-1; i++) {
      var sprint = settings.sprints[i];
			if (!this.scope || (this.scope && sprint.id == this.scope)){
				var queueItem = new SprintRetriever(sprint, this.restClient, this.dataModel);
				if (this.sprintQueue.length > 0) queueItem.setSuccessor(this.sprintQueue[0]);
				this.sprintQueue.unshift(queueItem);
			}
		}
		this.sprintQueue[0].retrieveSprint();
		this.scope = null
	}

	

}

module.exports = DataRetriever;


