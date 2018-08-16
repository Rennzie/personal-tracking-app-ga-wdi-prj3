const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const eventSchema = mongoose.Schema({
  createdBy: {type: ObjectId, ref: 'User'}, //hosting user
  category: { type: String, required: true },
  capacity: Number,
  concluded: Boolean,
  duration: { type: String, required: true },
  description: String,
  eventTitle: { type: String, required: true },
  eventDate: { type: Date, required: true },
  guests: [ { type: ObjectId } ], //to hold all users attending the event
  imageUrl: String,
  isIndoors: Boolean,
  location: {     //sub document to hold event location
    streetNumber: Number,
    streetName: String,
    postcode: String,
    lat: Number,          //we will need to geocode the lat & lon
    lon: Number           // should seed this initially
  },
  reviews: {    // sub-document to hold simple reviews
    addedBy: { type: ObjectId },
    rating: { type: Number, required: true },
    comment: String
  }
}, { timestamps: true });


//VIRTUALS
//  --> geocode the location to a latlon



module.exports = mongoose.model('Event', eventSchema);
