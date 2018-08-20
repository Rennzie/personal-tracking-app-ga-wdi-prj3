//BACK END eventController
const Event = require('../models/event');
const mongoose = require('mongoose');

//---------for all the event data --------///
function eventShow(req, res, next ){
  Event
    .findById(req.params.id)
    .populate('guests createdBy')
    .then( event => res.json(event))
    .catch(next);
}

function eventIndex( req, res, next ){
  // console.log('Event index fired in controller');
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

function eventUpdate (req, res, next ){
  Event
    .findById(req.params.id)
    .then(event => event.set(req.body) )
    .then(event => event.save())
    .then(event => res.status(201).json(event))
    .catch(next);
}

function eventDelete( req, res, next ){
  Event
    .findById(req.params.id)
    .then(event => event.remove())
    .then(() => res.sendStatus(204)) //send 204 as we are not sending json
    .catch(next);
}

function eventAddGuest( req, res, next ){
  Event
    .findById(req.params.id)
    // .populate('guests')
    .then(event => event.addGuest(req.body.id))
    .then(event => Event.populate(event, { path: 'guests'}))
    .then(event => res.json(event) )
    .catch(next);
}

function removeAGuest( req, res, next ){
  Event
    .findById(req.params.eventId)
    .then(event => event.removeGuest(req.params.guestId))
    .then(event => Event.populate(event, { path: 'guests'}))
    .then(event => res.json(event))
    .catch(next);
}

module.exports = {
  show: eventShow,
  index: eventIndex,
  create: eventCreate,
  update: eventUpdate,
  delete: eventDelete,
  addNewGuest: eventAddGuest,
  guestDelete: removeAGuest
};
