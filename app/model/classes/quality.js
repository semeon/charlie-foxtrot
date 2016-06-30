"use strict";

class QualityMetric {
	constructor(s) {
		this.settings = s; 
		this.quality = {};
		this.quality.metric = 0;
		this.quality.records = [];

		this.severityWeight = {};
		this.severityWeight["Blocker"] = 3;
		this.severityWeight["Critical"] = 2;
		this.severityWeight["Major"] = 1;

		this.qaPhaseWeight = {};
		this.qaPhaseWeight["Production"] = 3;
		this.qaPhaseWeight["Release Candidate"] = 2;
		this.qaPhaseWeight["Demo"] = 1;
	}
	
	update(tickets) {

		// console.log("Quality UPDATE");
		// console.log(tickets);


		if(tickets) {
			for (var i=0; i<tickets.length; i++) {
				var ticket = tickets[i];
				var record = {};
				record.ticketKey = ticket.key;
				record.ticketId = ticket.id;
				record.ticketTitle = ticket.fields.summary;
				record.severity = ticket.fields.priority.name;
				record.qaPhase = "-";
				if (ticket.fields.customfield_11000) record.qaPhase = ticket.fields.customfield_11000.value;
				record.weight = this.calcWeight(record.severity, record.qaPhase);
				this.quality.records.push(record);
				this.quality.metric += record.weight;
			}			
		}
	}
	
	calcWeight(severity, phase) {
		var result = 0;
		var sev = 0;
		var ph = 0;
		
		if (this.severityWeight[severity]) sev = this.severityWeight[severity];
		if (this.qaPhaseWeight[phase])  ph = this.qaPhaseWeight[phase];
		
		// FORMULA
		result = sev + ph - 1;
		
		if (result < 0) result = 0;
		// console.log("severity: " + severity + ", phase: " + ph + ", result: " + result);
		
		return result;
	}

	getQuality() {
		return this.quality;
	}

	
}

module.exports = QualityMetric;



