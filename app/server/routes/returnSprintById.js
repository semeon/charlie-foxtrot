"use strict";


function ReturnSprintById(req, res, next) {

	var id = req.params.id;

  res.send(id);
  return next();	
}

module.exports = ReturnSprintById;








