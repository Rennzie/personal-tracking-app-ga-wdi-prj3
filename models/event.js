const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const eventSchema = mongoose.Schema({
  createdBy: {type: ObjectId, ref: 'User'}, //hosting user
  category: { type: String, required: true },
  capacity: Number,
  concluded: Boolean,
  duration: { type: String, required: true },  // NOTE: might be best ot convert to millisecondss
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
    rating: { type: Number },
    comment: String
  }
}, { timestamps: true });


//VIRTUALS
//  --> geocode the postcode to a latlon // IDEA: we can use postcode.io to do this

//  --> convert the duration to milliseconds

//  --> convert the input event date to milliseconds

//  --> drop all postcodes to lowercase and remove spaces



module.exports = mongoose.model('Event', eventSchema);
