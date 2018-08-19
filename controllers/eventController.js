//BACK END eventController
const Event = require('../models/event');
const mongoose = require('mongoose');

//---------for all the event data --------///
function eventShow(req, res, next ){
  Event
    .findById(req.params.id)
    .populate('guests')
    .populate('createdBy')
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
    .then(event => {
      event.createdBy = mongoose.Types.ObjectId(req.params.id);
      event.set(event);
      return event.save();
    })
    .then(event => res.status(201).json(event))
    .catch(next);
}

function eventUpdate (req, res, next ){
  Event
    .findById(req.params.id)
    .then(event => event.set(req.body) )
    .then(event =>{
      // event.pupulate('guests');
      return event.save();
    } )
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

// NOTE: we did this in the front end
// //---------filtered route for the mind --------//
// function eventMindIndex( req, res, next ){
//   Event
//     .find()
//     .then(events =>{
//       const mindEvent = events.filter(event => event.category === 'mind' );
//       console.log('the filtered events are ', mindEvent);
//       return mindEvent;
//     })
//     .then(mindEvents => res.json(mindEvents))
//     .catch(next);
// }


module.exports = {
  show: eventShow,
  index: eventIndex,
  create: eventCreate,
  update: eventUpdate,
  delete: eventDelete
};
