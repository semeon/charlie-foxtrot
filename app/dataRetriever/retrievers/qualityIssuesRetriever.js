"use strict";

class QualityIssuesRetriever {
	// https://xplusz.atlassian.net/rest/api/latest/search?jql=labels%20in%20(qualitymetric)

	constructor(sprint, restClient, callback) {
		this.sprint = sprint;
		this.restClient = restClient;
		this.onCompletion = callback;
	}
	

	start() {
		var self = this;
		this.restClient.getQualityIssues(this.sprint, function(tickets) {

			console.log('JIRA: ---- Quality issues retrieved: ' +  tickets.length);

			self.onCompletion();
		});
	}

	


}

module.exports = QualityIssuesRetriever;