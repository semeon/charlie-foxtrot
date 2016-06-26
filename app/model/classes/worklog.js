"use strict";
var S = require('string');
class Worklog {
	constructor(worklog, ticket, settings) {
		this.id 								= worklog.id;
		this.date 							= worklog.started.substring(0, 10); // 2016-05-01T19:04:00.000-0700 > 2016-05-01;
		this.timestamp 					= worklog.started;
		this.timeSpent 					= worklog.timeSpent;
		this.timeSpentSeconds 	= worklog.timeSpentSeconds;
		this.ticketId 					= worklog.issueId;
		this.author 						= worklog.author.displayName;

		this.ticketKey 					= ticket.key;
		this.ticketType 				= ticket.fields.issuetype.name;
		this.ticketTitle				= ticket.fields.summary;

		// Work type
		var type = this.ticketType;
		if ( this.ticketType == "Epic" ) 		type = "Story";
		if ( this.ticketType == "Sub-task" ) type = "Story";
		if ( this.ticketType == "Task" ) {
			if( S(this.ticketTitle).contains("Testing Automation") ) 					type = "Testing Automation";
			else if ( S(this.ticketTitle).contains("[Operations]") ) 					type = "Operations";
			else if ( S(this.ticketTitle).contains("Regression Testing") ) 		type = "Regression Testing";
			else if ( S(this.ticketTitle).contains("Release Preparation") ) 	type = "Release Preparation";
		}
		this.workType = type;

		// Sub team
		var teamName = "Other";
		for (var i=0; i<settings.subTeams.length; i++) {
			var team = settings.subTeams[i];
			if( team.members.indexOf(this.author) > -1 ) {
				teamName = team.name;
				break;
			}
		}
		this.team = teamName;
	}
}

module.exports = Worklog;