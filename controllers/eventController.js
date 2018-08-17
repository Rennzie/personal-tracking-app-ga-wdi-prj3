//BACK END eventController
const Event = require('../models/event');


function eventIndex( req, res, next ){
  console.log('Event index fired in controller');
  Event
    .find()
    .then(events => res.json(events))
    .catch(next);
}

module.exports = {
  index: eventIndex
};
