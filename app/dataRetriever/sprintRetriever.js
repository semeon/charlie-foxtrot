"use strict";

var settings = require("../settings.js")
var RestClient = require("./restClient/restClient.js");
var WorklogRetriever = require('./retrievers/worklogRetriever.js');

class SprintRetriever {

	constructor(sprint, restClient, dataStorage) {
		this.dataStorage = dataStorage;
		this.sprint = sprint;
		this.restClient = restClient;
		this.succesor;
	}

	retrieveSprint() {
		var self = this;
		console.log("JIRA: -- Retriving sprint " + this.sprint.id);

		var wlRet = new WorklogRetriever(this.sprint, this.restClient, this.onRetrieveCompletion.bind(this));
		wlRet.start();
	
		// if(this.succesor) setTimout(self.retrieveNext.bind(self), 1000);
		// self.onRetrieveCompletion();
		
	}

	setSuccessor(successor) {
		this.succesor = successor;
	}
	
	onRetrieveCompletion() {
		
		
		if(this.succesor) {
			this.succesor.retrieveSprint();

		} else {
			console.log("JIRA: -- Sprint data retrivieng is completed.");
		}
		
	}
}

module.exports = SprintRetriever;


