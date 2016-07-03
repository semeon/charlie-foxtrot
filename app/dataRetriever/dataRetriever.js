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
		this.restClient = new RestClient(this);
		// this.sprintQueue = [];
		this.scope = null;
		this.activeThreads = 0;
		this.maxThreads = 1;
	}

	start(id) {
		var result = true;
		if (this.isBusy()) {
			result = false;
	    console.log('DATA: Too many requests, data retriever is busy. Number of active threads: '  + this.activeThreads);
		} else {
			this.takeThread();
	    console.log('');
	    console.log('JIRA: Login attemtp..');
			if (id) this.scope = id;
			this.restClient.login(this.retrieveData.bind(this));
		}
		return result;
	}

	// START DATA SCRAPING
	retrieveData() {
		console.log('');
		if (!this.scope) {
			console.log('JIRA: Retrieving all sprints.');
		} else {
			console.log('JIRA: Retrieving sprint ' + this.scope);
		}
		
		var sprintQueue = [];
		
		for (var i=0; i<=settings.sprints.length-1; i++) {
      var sprint = settings.sprints[i];
			if (!this.scope || (this.scope && sprint.id == this.scope)){
				var queueItem = new SprintRetriever(sprint, this.restClient, this.dataModel, this);
				if (sprintQueue.length > 0) queueItem.setSuccessor(sprintQueue[0]);
				sprintQueue.unshift(queueItem);
			}
		}
		sprintQueue[0].retrieveSprint();
		this.scope = null;
	}

	requestFailed(){
		console.log("Request failed!!");
		this.releaseThread();
	}

	requestSucceeded(){
		console.log("DATA: Data retrieving is completed.");
    console.log('');
		this.releaseThread();
	}

	takeThread(){
		this.activeThreads++;
		// console.log("threads++: " + this.activeThreads);
	}

	releaseThread(){
		this.activeThreads--;
		// console.log("threads--: " + this.activeThreads);
	}

	isBusy() {
		if (this.activeThreads < this.maxThreads) {
			return false;
		} else {
			return true;
		}
	}
	

}

module.exports = DataRetriever;


