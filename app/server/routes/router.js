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
	  res.send("Updating all sprints. Might take a while.");
	  console.log("Updating all sprints.");
		this.retriever.start();
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
	  res.send("Updating sprint: " + id);
	  console.log("Updating sprint: " + id);
		this.retriever.start(id);
	  return next();	
	}



}

module.exports = Router;








