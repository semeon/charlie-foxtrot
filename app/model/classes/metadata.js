"use strict";

class MetaData {
	constructor(settings) {
		this.settings = settings;

		this.meta = {};
		this.meta.users = [];
		this.meta.dates = [];
		this.meta.types = [];
		this.meta.teams = [];
		this.meta.teamMembers = {};
		this.meta.workingDays = 0;

		
		this.temp = {};
		this.temp.users = {};
		this.temp.dates = {};
		this.temp.types = {};
		this.temp.teams = {};
	}
	
	update(worklog) {
		var user = worklog.author;
		if(!this.temp.users[user]) {
			this.temp.users[user] = true;
			this.meta.users.push(user);
		}

		var team = worklog.team;
		if(!this.temp.teams[team]) {
			this.temp.teams[team] = true;
			this.meta.teams.push(team);
		}

		if (!this.meta.teamMembers[team]) {
			this.meta.teamMembers[team] = [];
			this.meta.teamMembers[team].push(user);
		} else {
			if (this.meta.teamMembers[team].indexOf(user) < 0) this.meta.teamMembers[team].push(user);
		}

		var date = worklog.date;
		if(!this.temp.dates[date]) {
			this.temp.dates[date] = true;
			this.meta.dates.push(date);
		}

		var type = worklog.workType;
		if(!this.temp.types[type]) {
			this.temp.types[type] = true;
			this.meta.types.push(type);
		}

	}

	postprocess(summary) {
		this.meta.users.sort();
		this.meta.dates.sort();
		this.meta.types.sort();
		this.meta.teams.sort();
		
		for(var t in this.meta.teamMembers) {
			var team = this.meta.teamMembers[t];
			team.sort();
		}

		this.meta.workingDays = 0;

		for (var i=0; i<this.meta.dates.length; i++) {
			var date = this.meta.dates[i];
			if (summary.byDate[date] && summary.byDate[date] > 28800) this.meta.workingDays++;
		}
		
	}

	getMetaData() {
		return this.meta;
	}

	
}

module.exports = MetaData;



