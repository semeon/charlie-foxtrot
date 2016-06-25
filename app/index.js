"use strict";

var Application = require('./app.js');



var app = new Application();
app.start();



var data = [
	{
		"id": "000",
		"name": "The thing 001",
		"props": [
			{"prop1": "This is prop 1"},
			{"prop2": "This is prop 3"},
			{"prop3": "This is prop 3"}
		]
	},

	{
		"id": "001",
		"name": "The thing 002",
		"props": [
			{"prop1": "This is prop 1"},
			{"prop2": "This is prop 3"},
			{"prop3": "This is prop 3"}
		]
	},

	{
		"id": "002",
		"name": "The thing 003",
		"props": [
			{"prop1": "This is prop 1"},
			{"prop2": "This is prop 3"},
			{"prop3": "This is prop 3"}
		]
	}
	
];
