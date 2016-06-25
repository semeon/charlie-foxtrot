"use strict";

var restify = require('restify');


class RestClient {

	constructor() {
		this.asyncCounter = 0;
		this.loggedIn = false;		
		this.creds = require('./cred.js').cred;
		this.jiraUrl = "https://xplusz.atlassian.net";
		this.params = {
	    headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"cookie": ""
	    },
		};
		// this.client;
		this.client = restify.createJsonClient({
		  url: this.jiraUrl,
	    headers: this.params.headers
		});		
	}


	login(callback) {
		var self = this;
		var path = "/rest/auth/1/session";
		this.client.post(path, this.creds, function(err, request, response, data) {
        if (response.statusCode == 200) {
          console.log('JIRA: -- Succesfully logged in.');
					self.saveActiveSession(response, data);
					callback(data);
				} else {
          console.log('JIRA: could not login. Status: ', response.statusCode, ' (', response.statusMessage,  ')' );
				}
		});		
	}

	getSprintTickets(sprint, callback) {
		var self = this;
		var path = "/rest/api/latest/search";
    var data = {
	        jql: "project=RH AND worklogDate >= " + sprint.start  + " AND worklogDate <= " + sprint.end,
					maxResults: 300,
				};

		// console.log('JIRA: ---- Requesting tickets');
		this.client.post(path, data, function(err, request, response, data) {
        if (response.statusCode == 200) {

					if (data.total > data.maxResults) {
						console.log("ERROR: COULD NOT RETRIEVE ALL ISSUES. PAGINATION IS NOT IMPLEMENTED.");
						console.log("-- PAGE SIZE: " + data.maxResults);
						console.log("-- DATA SIZE: " + data.total);
					}

					var issues = data.issues;
					callback(issues);
					
				} else {
        	console.log('JIRA: Could not retrieve data. Status: ', response.statusCode, ' (', response.statusMessage,  ')' );
      	}
			});
	}


	retrieveTicketWorklogs(sprint, issue, callback) {
		var self = this;
		var path = "/rest/api/latest/issue/" + issue.id + "/worklog";

		this.client.get(path,
			function(err, request, response, data) {
        if (response.statusCode == 200) {
					if (data.total > data.maxResults) {
						console.log("ERROR: COULD NOT RETRIEVE ALL WORKLOGS. PAGINATION IS NOT IMPLEMENTED.");
						console.log("-- PAGE SIZE: " + data.maxResults);
						console.log("-- DATA SIZE: " + data.total);
					}
					var worklogs = data.worklogs;
					callback(issue, worklogs);
				} else {
        	console.log('JIRA: Could not retrieve ticket. Status: ', response.statusCode, ' (', response.statusMessage,  ')' );
        }
			});
	}


	getQualityIssues(sprint, callback) {
		var self = this;
		var path = "/rest/api/latest/search";
		
    var data = {
	        jql: "labels in (qualitymetric) AND affectedVersion in ("  + sprint.id +  ")",
					maxResults: 300,
				};
		// console.log('JIRA: -- JQL: ' + data.jql);

		this.client.post(path, data,
			function(err, request, response, data) {
        if (response.statusCode == 200) {
					if (data.total > data.maxResults) {
						console.log("ERROR: COULD NOT RETRIEVE ALL ISSUES. PAGINATION IS NOT IMPLEMENTED.");
						console.log("-- PAGE SIZE: " + data.maxResults);
						console.log("-- DATA SIZE: " + data.total);
					}
					var issues = data.issues;
					callback(issues);
					
				} else {
        	console.log('JIRA: Could not retrieve data. Status: ', response.statusCode, ' (', response.statusMessage,  ')' );
      	}
			});
	}


	saveActiveSession(response, data) {
		this.loggedIn = true;
		var secretCookie = response.headers['set-cookie'][3];
		this.params.headers.cookie = data.session.name + '=' + data.session.value + ';' + secretCookie;
    // console.log("Cookie: " + this.params.headers.cookie);
	}


	post(path, params, callback) {
		this.client.post(url, this.creds, function(err, request, response, data) {
        if (response.statusCode == 200) {
					callback(data);
				} else {
          console.log('JIRA: could not login. Status: ', response.statusCode, ' (', response.statusMessage,  ')' );
				}
				self.asyncCompleted();
		});		

	}

	asyncStarted() {
		this.asyncCounter++;
	}

	asyncCompleted() {
		this.asyncCounter--;
	}


}

module.exports = RestClient;


