"use strict";

var mongoose = require('mongoose');
var jsonfile = require('jsonfile');

var settings = require("../../settings.js")
var Schemas = require("./schemas.js")



class DataStorage {

	constructor() {
		this.sprints = {};
		this.presetData();
	}


	// API
	getSprints() {
		var result = [];
		for (var id in this.sprints) {
			var brief = {};
			brief = this.sprints[id].settings;
			brief.updated = this.sprints[id].status.updated;
			result.push(brief);
		}
		return result;
	}

	getSprintById(id) {
		return this.sprints[id];
	}

	saveSprint(sprintReport) {
		this.sprints[sprintReport.settings.id].summary = sprintReport.summary;
		this.sprints[sprintReport.settings.id].meta = sprintReport.meta;
		this.sprints[sprintReport.settings.id].quality = sprintReport.quality;
		this.sprints[sprintReport.settings.id].status.updated = new Date();
	}
	
	saveSprintToDB(sprintReport) {
		console.log("DATA: ---- Saving sprint report to DB");
		if (!this.reportSchema) this.createReportSchema(sprintReport);
		if (!this.reportModel) this.createReportModel();

		console.dir(this.reportSchema);
		// console.dir(this.reportModel);
		
		var report = new this.reportModel(sprintReport);

		report.save(function (err, report) {

			console.log("Saving report to db completed");
		  if (err) return console.error(err);

		});
		
		// this.saveFile(sprintReport.settings, sprintReport);
		// this.data.reports[sprintReport.settings.id] = sprintReport;
	}


	// INTERNAL

	presetData() {
		for(var i=0; i<settings.sprints.length; i++) {
			var sprint = settings.sprints[i];
			this.sprints[sprint.id] = {};
			this.sprints[sprint.id].settings = sprint;
			this.sprints[sprint.id].status = {};
			this.sprints[sprint.id].status.updated = null;
		}
	}

	createReportSchema(sprintReport) {
		this.reportSchema = this.schemeGen.getReportSchema(sprintReport);
	}

	createReportModel() {
		this.reportModel = this.mongooseConnection.model('SprintReport', this.reportSchema, 'sprint-reports');
	}

	connectToDb() {
		this.creds = {};
		if (process.argv[4]) this.creds.username = process.argv[4];
		if (process.argv[5]) this.creds.password = process.argv[5];
		if (process.env.DB_USER) this.creds.username = process.env.DB_USER;
		if (process.env.DB_PASS) this.creds.password = process.env.DB_PASS;

		this.mongooseConnection = mongoose.connect('mongodb://' +  this.creds.username + ':' + this.creds.password + '@ds021984.mlab.com:21984/rh-report');
		console.log("mongoose.connect");
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			console.log("mongoose connected");
		  // we're connected!
		});
		
		this.schemeGen = new Schemas();
		this.reportSchema;
		this.reportModel;		
	}


	// saveRawToFile(sprint, sprintData) {
	// 		var filePath = "./data/raw/" + sprint.id + ".json";
	// 		console.log('DATA: ---- Saving raw data to file: ' + filePath);
	//
	// 		jsonfile.writeFile(	filePath,
	// 												sprintData, {spaces: 2},
	// 												function (err) { if(err) console.error(err) }
	// 											);
	// }
	//
	// saveFile(sprint, sprintReport) {
	// 		var filePath = this.reportsFilePath + sprint.id + ".json";
	// 		console.log('DATA: ---- Saving report to file: ' + filePath);
	//
	// 		jsonfile.writeFile(	filePath,
	// 												sprintReport, {spaces: 2},
	// 												function (err) { if(err) console.error(err) }
	// 											);
	// }
	//
	// readReport(sprintId) {
	// 		var filePath = this.reportsFilePath + sprintId + ".json";
	// 		var data = jsonfile.readFileSync(filePath);
	// 		return data;
	// }



}

module.exports = DataStorage;