"use strict";

var settings = require("../settings.js")
var RestClient = require("./restClient/restClient.js");

var WorklogRetriever = require('./retrievers/worklogRetriever.js');
var QualityIssuesRetriever = require('./retrievers/qualityIssuesRetriever.js');

class SprintRetriever {

	constructor(sprint, restClient, dataStorage) {
		this.sprint = sprint;

		this.dataStorage = dataStorage;
		
		this.sprintData = {};
		this.sprintData.settings = sprint;
		
		this.restClient = restClient;
		this.succesor;
		
		this.initRetrievers();
	}

	initRetrievers() {
		this.wlRet = new WorklogRetriever(this.sprint, this.restClient, this.orWorklogsRetrieval.bind(this));
		this.qiRet = new QualityIssuesRetriever(this.sprint, this.restClient, this.onQualityIssueRetrieval.bind(this));
	}

	setSuccessor(successor) {
		this.succesor = successor;
	}

	retrieveSprint() {
		var self = this;
		console.log("JIRA: -- Retriving sprint " + this.sprint.id);

		this.wlRet.start();
		// if(this.succesor) setTimout(self.retrieveNext.bind(self), 1000);
		// self.onRetrieveCompletion();
	}
	
	orWorklogsRetrieval(data) {
		this.sprintData.tickets = data.tickets;
		this.sprintData.worklogs = data.worklogs;
		this.qiRet.start();
	}
	
	onQualityIssueRetrieval(data) {
		this.sprintData.qIssues = data;
		this.onRetrieveCompletion();
	}
	
	onRetrieveCompletion(data) {
		this.dataStorage.addSprintData(this.sprint, this.sprintData);

		if(this.succesor) {
			this.succesor.retrieveSprint();
		} else {
			console.log("JIRA: Sprint data retrieving is completed.");
		}
	}
}

module.exports = SprintRetriever;


