"use strict";

class Router {
	
	constructor(model, retriever) {
		this.model = model;
		this.retriever = retriever;
	}
	
	returnSprintList(req, res, next) {
		var list = this.model.getSprintList();
	  res.send(list);
	  return next();	
	}

	returnSprintById(req, res, next) {
		var id = req.params.id;
		var result = this.model.getSprintById(id);
	  res.send(result);
	  return next();	
	}

	startDataUpdate(req, res, next) {
		this.retriever.start();
	  res.send("Data update initiated. Might take a while.");
	  console.log("Calling data retriever..");
	  return next();	
	}

}

module.exports = Router;








