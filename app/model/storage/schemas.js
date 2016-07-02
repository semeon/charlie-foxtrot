"use strict";


class Schemas {
	constructor() {
		this.schemeGenerator = require('generate-schema');
	}

	getReportSchema(report) {
		var scheme = this.schemeGenerator.mongoose(report);
		return scheme;
	}
	
}

module.exports = Schemas;


