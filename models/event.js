const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const eventSchema = mongoose.Schema({
  createdBy: {type: ObjectId, ref: 'User'}, //hosting user
  eventTitle: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: String,
  eventDate: { type: Date, required: true },
  duration: { type: String, required: true },
  description: String,
  location: {     //sub document to hold event location
    streetNumber: Number,
    streetName: String,
    postcode: String,
    lat: Number,          //we will need to geocode the lat & lon
    lon: Number           // should seed this initially
  },
  capacity: Number,
  concluded: Boolean,
  guests: [ { type: ObjectId } ], //to hold all users attending the event
  isIndoors: Boolean,
  reviews: {    // sub-document to hold simple reviews
    addedBy: { type: ObjectId },
    rating: { type: Number, required: true },
    comment: String
  }
});


//VIRTUALS
//  --> geocode the location to a latlon



module.exports = mongoose.model('Event', eventSchema);
