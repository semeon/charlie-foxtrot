"use strict";

var settings = require("../../settings.js")

var Worklog = require('./classes/worklog.js');
var Summary = require('./classes/summary.js');
var MetaData = require('./classes/metadata.js');
var QualityMetric = require('./classes/quality.js');


class DataProcessor {

	constructor() {
	}

	processSprint(sprint, rawSprintData) {

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
		
		return sprintReport;

	}

}

module.exports = DataProcessor;