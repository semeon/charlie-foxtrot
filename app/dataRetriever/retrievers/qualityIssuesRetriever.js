"use strict";

class QualityIssuesRetriever {
	// https://xplusz.atlassian.net/rest/api/latest/search?jql=labels%20in%20(qualitymetric)

	constructor(restClient, dataHandler) {
		this.restClient = restClient;
		this.dataHandler = dataHandler;
	}
	
	// REQUEST SPRINT TICKETS
	getQualityIssues(sprint) {
		var self = this;
		var url = this.restClient.baseUrl + "/rest/api/latest/search";
		
    var params = {
      headers: 				this.restClient.defaultRequestParams.headers,
			requestConfig: 	this.restClient.defaultRequestParams.requestConfig,
			responseConfig: this.restClient.defaultRequestParams.responseConfig,	
      data: {
        jql: "labels in (qualitymetric) AND affectedVersion in ("  + sprint.id +  ")",
				maxResults: 300,
      },
    };
		console.log('JIRA: -- Requesting quality issue tickets for sprint ' + sprint.id + '...');
		// console.log('JIRA: -- JQL: ' + params.data.jql);
		this.restClient.asyncStarted();
		this.restClient.client.post(url, params,
			function(data, response) {
        if (response.statusCode == 200) {
					// console.log('JIRA: Status: ', response.statusCode, ' (', response.statusMessage,  ')' );
					console.log('JIRA: -- Retrieved',  data.total, 'quality issue tickets belonging to sprint ' + sprint.id + '.');
					if (data.total > data.maxResults) {
						console.log("ERROR: COULD NOT RETRIEVE ALL ISSUES. PAGINATION IS NOT IMPLEMENTED.");
						console.log("-- PAGE SIZE: " + data.maxResults);
						console.log("-- DATA SIZE: " + data.total);
					}
					// console.log(data);
					var issues = data.issues;
					// self.retrieveSprintWorklogs(sprint, issues);
					self.retrieveIssue(sprint, issues);
					
				} else {
        	console.log('JIRA: Could not retrieve data. Status: ', response.statusCode, ' (', response.statusMessage,  ')' );
      	}
				self.restClient.asyncCompleted();
			});
	}
	
	// ADD ISSUES TO DATA
	retrieveIssue(sprint, tickets) {
		for (var i=0; i<tickets.length; i++) {
			var ticket = tickets[i];
			this.dataHandler.createQualityMetricRecordFromTicket(sprint, ticket);
		}
	}

}

module.exports.QualityIssuesRetriever = QualityIssuesRetriever;