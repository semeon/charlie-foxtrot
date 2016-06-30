"use strict";

var later = require('later');


class Scheduler {
	
	constructor() {
	}

	scheduleJob(textSched, task) {
		var sched = later.parse.text(textSched);
		var job = later.setInterval(task, sched);
	}
	
}

module.exports = Scheduler;