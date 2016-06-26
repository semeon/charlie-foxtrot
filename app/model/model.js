"use strict";

var jsonfile = require('jsonfile');
var settings = require("../settings.js")

var Worklog = require('./classes/worklog.js');

var Summary = require('./classes/summary.js');
var MetaData = require('./classes/metadata.js');
var QualityMetric = require('./classes/quality.js');


class Model {

	constructor() {
		this.rawData = {};
		this.rawData.sprints = {};

	}

	addSprintData(sprint, rawSprintData) {
		this.saveRawToFile(sprint, rawSprintData);
		this.processdata(sprint, rawSprintData);
	}

	processdata(sprint, rawSprintData) {

		console.log('DATA: ---- Building report for ' + sprint.id);

		var sprintReport = {};
		sprintReport.settings = rawSprintData.settings;

		// Collect meta and sprint summaries

		var summary = new Summary(settings);
		var meta = new MetaData(settings);
		var quality = new QualityMetric(settings);

		// Update Summary
		for(var i=0; i<rawSprintData.worklogs.length; i++) {
			var wl = rawSprintData.worklogs[i];
			var ticket = rawSprintData.tickets[wl.issueId];
			var worklog = new Worklog(wl, ticket, settings);
			
			
			meta.update(worklog);
			summary.update(worklog);
		}
		sprintReport.summary = summary.getSummary();

		// Update Meta
		meta.postprocess(sprintReport.summary);
		sprintReport.meta = meta.getMetaData();

		// Update Quality Metric
		quality.update(rawSprintData.qIssues);
		sprintReport.quality = quality.getQuality();
		
		this.saveFile(sprint, sprintReport);
	}


	saveRawToFile(sprint, sprintData) {
			var filePath = "./data/raw/" + sprint.id + ".json";
			console.log('DATA: ---- Saving raw data to file: ' + filePath);

			jsonfile.writeFile(	filePath,
													sprintData, {spaces: 2},
													function (err) { if(err) console.error(err) }
												);
	}

	saveFile(sprint, sprintReport) {
			var filePath = "./data/reports/" + sprint.id + ".json";
			console.log('DATA: ---- Saving report to file: ' + filePath);

			jsonfile.writeFile(	filePath,
													sprintReport, {spaces: 2},
													function (err) { if(err) console.error(err) }
												);
	}


}

module.exports = Model;


