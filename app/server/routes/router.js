"use strict";

class Router {
	
	constructor(model, retriever) {
		this.model = model;
		this.retriever = retriever;
	}
	
	returnSprintList(req, res, next) {
	  console.log("SERVER: Route requested: " + req.route.path);
	  console.log("SERVER: URL requested: " + req.url);
		var list = this.model.getSprintList();
	  res.send(list);
	  return next();	
	}

	returnSprintById(req, res, next) {
	  console.log("SERVER: Route requested: " + req.route.path);
	  console.log("SERVER: URL requested: " + req.url);
		var id = req.params.id;
		var result = this.model.getSprintById(id);
	  res.send(result);
	  return next();	
	}

	startDataUpdate(req, res, next) {
	  console.log("SERVER: Route requested: " + req.route.path);
	  console.log("SERVER: URL requested: " + req.url);
		this.retriever.start();
	  res.send("Data update initiated. Might take a while.");
	  console.log("Calling data retriever..");
	  return next();	
	}

}

module.exports = Router;








