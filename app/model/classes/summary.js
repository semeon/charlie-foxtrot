"use strict";

class Summary {
	constructor(s) {
		this.settings = s; 
		this.summary = {};
		this.summary.total = 0;

	}
	
	update(worklog) {
		// console.dir(worklog);

		var value = worklog.timeSpentSeconds;
		var user  = worklog.author;
		var date  = worklog.date;
		var type = worklog.workType;
		var team = worklog.team;

		this.summary.total += value;

		// console.log(">> TOTAL INC: " + value);

		this.updateByPerson(user, value);
		this.updateByPersonDate(user, date, value);
		this.updateByDate(date, value);
		this.updateByTeam(team, value);
		this.updateByTeamDate(team, date, value);
		
		this.updateSumWorkTypes(type, value);		
	}

	updateByPerson(user, value) {
		if(!this.summary.byPerson) this.summary.byPerson = {};
		if(!this.summary.byPerson[user]) this.summary.byPerson[user] = 0;
		this.summary.byPerson[user] += value;
	}

	updateByPersonDate(user, date, value) {
		if(!this.summary.byPersonDate) this.summary.byPersonDate = {};
		if(!this.summary.byPersonDate[user]) this.summary.byPersonDate[user] = {};
		if(!this.summary.byPersonDate[user][date]) this.summary.byPersonDate[user][date] = 0;
		this.summary.byPersonDate[user][date] += value;
	}

	updateByDate(date, value) {
		if(!this.summary.byDate) this.summary.byDate = {};
		if(!this.summary.byDate[date]) this.summary.byDate[date] = 0;
		this.summary.byDate[date] += value;
	}

	updateByTeam(team, value) {
		if(!this.summary.byTeam) this.summary.byTeam = {};
		if(!this.summary.byTeam[team]) this.summary.byTeam[team] = 0;
		this.summary.byTeam[team] += value;
	}

	updateByTeamDate(team, date, value) {
		if(!this.summary.byTeamDate) this.summary.byTeamDate = {};
		if(!this.summary.byTeamDate[team]) this.summary.byTeamDate[team] = {};
		if(!this.summary.byTeamDate[team][date]) this.summary.byTeamDate[team][date] = 0;
		this.summary.byTeamDate[team][date] += value;
	}

	

	updateSumWorkTypes(type, value) {
		if(!this.summary.byWorkType) this.summary.byWorkType = {};
		if(!this.summary.byWorkType[type]) this.summary.byWorkType[type] = 0;
		this.summary.byWorkType[type] += value;
	}

	getSummary() {
		return this.summary;
	}

	
}

module.exports = Summary;



