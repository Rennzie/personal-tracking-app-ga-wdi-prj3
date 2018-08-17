//BACK END eventController
const Event = require('../models/event');

function eventShow(req, res, next ){
  Event
    .findById(req.params.id)
    .then( event => res.json(event))
    .catch(next);
}


function eventIndex( req, res, next ){
  console.log('Event index fired in controller');
  Event
    .find()
    .then(events => res.json(events))
    .catch(next);
}

function eventCreate( req, res, next ){
  Event
    .create(req.body)
    .then(event => res.status(201).json(event))
    .catch(next);
}

module.exports = {
  show: eventShow,
  index: eventIndex,
  create: eventCreate
};
