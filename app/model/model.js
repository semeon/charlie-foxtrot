"use strict";

var jsonfile = require('jsonfile');

class Model {

	constructor() {
		this.rawData = {};
		this.rawData.sprints = {};

	}

	addSprintData(sprint, sprintData) {
		console.log("DATA: ---- Adding sprint " + sprint.id + " data to storage");
		this.saveFile(sprint, sprintData);
		// this.rawData.sprints[sprint.id] = sprintData;


	}

	saveFile(sprint, sprintData) {
			var filePath = "./data/" + sprint.id + ".json";
			console.log('DATA: ---- Saving to file: ' + filePath);

			jsonfile.writeFile(	filePath,
													sprintData, {spaces: 2},
													function (err) { if(err) console.error(err) }
												);
	}

}

module.exports = Model;


