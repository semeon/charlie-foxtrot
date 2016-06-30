"use strict";

var jsonfile = require('jsonfile');
var settings = require("../../settings.js")

class DataStorage {

	constructor() {
		this.rawData = {};
		this.rawData.sprints = {};

		this.data = {};
		this.data.reports = {};
		
		this.reportsFilePath = "./data/reports/";
		
	}

	// API
	
	saveSprint(sprintReport) {
		this.saveFile(sprintReport.settings, sprintReport);
		this.data.reports[sprintReport.settings.id] = sprintReport;
	}

	getSprints() {
		var result = [];
		for(var i=0; i<settings.sprints.length; i++) {
			var sprint = settings.sprints[i];
			result.push(sprint);
		}
		return result;
	}

	getSprintById(id) {
		return this.readReport(id);
	}


	// INTERNAL
	saveRawToFile(sprint, sprintData) {
			var filePath = "./data/raw/" + sprint.id + ".json";
			console.log('DATA: ---- Saving raw data to file: ' + filePath);

			jsonfile.writeFile(	filePath,
													sprintData, {spaces: 2},
													function (err) { if(err) console.error(err) }
												);
	}

	saveFile(sprint, sprintReport) {
			var filePath = this.reportsFilePath + sprint.id + ".json";
			console.log('DATA: ---- Saving report to file: ' + filePath);

			jsonfile.writeFile(	filePath,
													sprintReport, {spaces: 2},
													function (err) { if(err) console.error(err) }
												);
	}

	readReport(sprintId) {
			var filePath = this.reportsFilePath + sprintId + ".json";
			var data = jsonfile.readFileSync(filePath);
			return data;
	}



}

module.exports = DataStorage;