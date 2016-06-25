"use strict";

var settings = require("../../settings.js")


class WorklogRetriever {

	constructor(sprint, restClient, callback) {
		this.sprint = sprint;
		this.restClient = restClient;
		
		this.onCompletion = callback;

		this.data = {};
		this.data.tickets = {};
		this.data.worklogs = {};
		
		this.wlRequestCounter = 0;
		
	}
	
	start() {
		var self = this;
		this.restClient.getSprintTickets(this.sprint, function(tickets) {

			self.retrieveSprintWorklogs(self.sprint, tickets);
			
			// self.onCompletion();
		});
	}


	retrieveSprintWorklogs(sprint, tickets) {
		var self = this;
		console.log('JIRA: ---- Retriving worklogs for sprint ' + sprint.id + '.');

		for(var i=0; i<tickets.length; i++) {
			var ticket = tickets[i];
			this.data.tickets[ticket.id] = ticket; 
			this.wlRequestCounter++;
			this.restClient.retrieveTicketWorklogs(sprint, ticket, this.onWorklogRetrieval.bind(this));
		}

	}
	
	
	onWorklogRetrieval(ticket, worklogs) {
		this.wlRequestCounter--;
		this.data.worklogs[ticket.id] = worklogs;
		
		if (this.wlRequestCounter <= 0 ) {
			console.log('JIRA: ---- Worklogs retrieved: ' +  worklogs.length);
			this.onCompletion(this.data);
		}
	}
	
}

module.exports = WorklogRetriever;