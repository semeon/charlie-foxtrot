"use strict";

var model = require('../../model/model.js');

function ReturnSprintList(req, res, next) {
	var list = model.getSprintList();
  res.send(list);
  return next();	
}

module.exports = ReturnSprintList;








