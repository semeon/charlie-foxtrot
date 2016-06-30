"use strict";

var model = require('../../model/model.js');

function ReturnSprintById(req, res, next) {

	var id = req.params.id;

	var result = model.getSprintById(id);


  res.send(result);
  return next();	
}

module.exports = ReturnSprintById;








