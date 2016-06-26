var appSettings = {};

appSettings.sprints = [
	{
		"id": "R31",
		"title": "R31: 2016-06-27 Nav 5",
		"start": "2016-06-14",
		"end": "2016-06-27",
	},

/*
	
	{
		"id": "R30",
		"title": "R30: 2016-06-13 Nav 4",
		"start": "2016-05-31",
		"end": "2016-06-13",
	},
*/	

	{
		"id": "R29",
		"title": "R29: 2016-05-30 Nav 3",
		"start": "2016-05-17",
		"end": "2016-05-30",
	},
	/* 
	{
		"id": "R28",
		"title": "R28: 2016-05-16 Nav 2",
		"start": "2016-04-26",
		"end": "2016-05-16",
	},

	{
		"id": "R27",
		"title": "R27: 2016-04-25 Nav 1",
		"start": "2016-04-12",
		"end": "2016-04-25",
	},

	{
		"id": "R26",
		"title": "R26: 2016-04-11 BCPI MVP 2",
		"start": "2016-03-29",
		"end": "2016-04-11",
	},

	{
		"id": "R25",
		"title": "R25: 2016-03-28 BPCI MVP 1",
		"start": "2016-03-15",
		"end": "2016-03-28",
	},

	{
		"id": "R24",
		"title": "R24: 2016-03-14 ProOrtho 2.0_2",
		"start": "2016-03-01",
		"end": "2016-03-14",
	},

	{
		"id": "R23",
		"title": "R23: 2016-03-14 ProOrtho 2.0_1",
		"start": "2016-02-16",
		"end": "2016-02-29",
	},
	
	*/

	// {
	// 	"id": "DEBUG",
	// 	"title": "DEBUG: 3/09 - 3/09",
	// 	"start": "2016-03-10",
	// 	"end": "2016-03-10",
	// },
];

appSettings.subTeams = [
	{
		name: "FE Dev",
		members: ["Albert Zhang",	"Colin Chen",	"Friday Dai",	"Matt Jiang"]
	},

	{
		name: "BE Dev",
		members: ["Charles Chen",	"Dennis Yan",	"Michael Zhao",	"Sky Wang"]
	},

	{
		name: "QA",
		members: ["Edith Sun", "Lilith Zhang", "Sandy Chen"]
	},

	{
		name: "Other",
		members: []
	},

];

appSettings.workTypes = [
	{
		"type": "Story", 
		"color": "green"
	},
	{
		"type": "Improvement", 
		"color": "olive"
	},
	{
		"type": "Task", 
		"color": "grey"
	},
	{
		"type": "Bug", 
		"color": "orange"
	},
	{
		"type": "Regression Testing", 
		"color": "yellow"
	},
	{
		"type": "Testing Automation", 
		"color": "blue"
	},
	{
		"type": "Release Preparation", 
		"color": "teal"
	},
	{
		"type": "Design Task", 
		"color": "pink"
	},
	{
		"type": "Overhead", 
		"color": "red"
	},
];

module.exports = appSettings;