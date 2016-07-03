"use strict";

var settings = require("../settings.js")
var RestClient = require("./restClient/restClient.js");

var WorklogRetriever = require('./retrievers/worklogRetriever.js');
var QualityIssuesRetriever = require('./retrievers/qualityIssuesRetriever.js');

class SprintRetriever {

	constructor(sprint, restClient, dataModel, retriever) {
		this.sprint = sprint;
		this.dataModel = dataModel;
		this.retriever = retriever;
				
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
		this.dataModel.addSprintData(this.sprint, this.sprintData);

		if(this.succesor) {
			this.succesor.retrieveSprint();
		} else {
			this.retriever.requestSucceeded();
		}
	}
}

module.exports = SprintRetriever;


