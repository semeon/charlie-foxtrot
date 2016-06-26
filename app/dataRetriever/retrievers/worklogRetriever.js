"use strict";

var settings = require("../../settings.js")


class WorklogRetriever {

	constructor(sprint, restClient, callback) {
		this.sprint = sprint;
		this.restClient = restClient;
		this.onCompletion = callback;
		this.wlRequestCounter = 0;

		this.data = {};
		this.data.tickets = {};
		this.data.worklogs = [];
	}
	
	start() {
		var self = this;
		this.restClient.getSprintTickets(this.sprint, function(tickets) {
  		console.log('JIRA: ---- Tickets retrieved: ' + tickets.length);
			self.retrieveSprintWorklogs(self.sprint, tickets);
		});
	}

	retrieveSprintWorklogs(sprint, tickets) {
		var self = this;
		for(var i=0; i<tickets.length; i++) {
			var ticket = tickets[i];
			this.data.tickets[ticket.id] = ticket; 
			this.wlRequestCounter++;
			this.restClient.retrieveTicketWorklogs(sprint, ticket, this.onWorklogRetrieval.bind(this));
		}

	}
	
	onWorklogRetrieval(ticket, worklogs) {
		this.wlRequestCounter--;
		
		for(var w=0; w<worklogs.length; w++) {
			var worklog = worklogs[w];
			var worklogDate = worklog.started.substring(0, 10);
			if (worklogDate >= this.sprint.start && worklogDate <= this.sprint.end ) {
				this.data.worklogs.push(worklog);
			}
		}		
		
		if (this.wlRequestCounter <= 0 ) {
			console.log('JIRA: ---- Worklogs retrieved: ' +  this.data.worklogs.length);
			this.onCompletion(this.data);
		}
	}
	
}

module.exports = WorklogRetriever;