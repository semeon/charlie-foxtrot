"use strict";

class Router {
	
	constructor(model, retriever) {
		this.model = model;
		this.retriever = retriever;
	}
	
	// route: /sprints
	getSprintList(req, res, next) {
	  console.log("SERVER: Route requested: " + req.route.path);
	  console.log("SERVER: URL requested: " + req.url);
		var list = this.model.getSprintList();
	  res.send(list);
	  return next();	
	}
	
	// route: /sprints/update
	updateAllSprints(req, res, next) {
	  console.log("SERVER: Route requested: " + req.route.path);
	  console.log("SERVER: URL requested: " + req.url);
		var result = this.retriever.start();
		if (result) {
		  res.send("Updating all sprints. Might take a while.");
		} else {
		  res.send("Server is busy, try later.");
		}
	  return next();	
	}
	
	// route: /sprint/:id
	getSprintById(req, res, next) {
	  console.log("SERVER: Route requested: " + req.route.path);
	  console.log("SERVER: URL requested: " + req.url);
		var id = req.params.id;
		var result = this.model.getSprintById(id);
	  res.send(result);
	  return next();	
	}

	// route: /sprint/:id/update
	updateSprint(req, res, next) {
	  console.log("SERVER: Route requested: " + req.route.path);
	  console.log("SERVER: URL requested: " + req.url);
		var id = req.params.id;
		var result = this.retriever.start(id);
		if (result) {
		  res.send("Updating sprint " + id);
		} else {
		  res.send("Server is busy, try later.");
		}		
		
	  return next();	
	}



}

module.exports = Router;








