const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const rp = require('request-promise');
const moment = require('moment');
moment().format();

const eventSchema = mongoose.Schema({
  createdBy: {type: ObjectId, ref: 'User'}, //hosting user
  category: { type: String, required: true },
  capacity: Number,
  concluded: Boolean,
  duration: { type: String, required: true },  // NOTE: might be best to convert to millisecondss
  description: String,
  eventTitle: { type: String, required: true },
  eventDateTime: { type: String, required: true },
  guests: [ { type: ObjectId, ref: 'User'} ], //to hold all users attending the event
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


// make sure the virtuals get added
eventSchema.set('toObject', { virtuals: true });
eventSchema.set('toJSON', { virtuals: true });


///Methods///
eventSchema.methods.addGuest = function (userId) {
  this.guests.push(userId.toString());
  // this.populate('guests');
  return this.save();
};

eventSchema.methods.removeGuest = function(userId){
  const userIdObj = mongoose.Types.ObjectId(userId);
  this.guests = this.guests.filter(guest => !userIdObj.equals(guest._id));
  return this.save();
};

//VIRTUALS
//encode the date and time correctly
//HTML5 gives a string in the date box which has time as well.
//setting time on the same form adds it to the date string
//
//// NOTE: may need to set a new date when editing, make it required field
//formats eventDateTime in a useable date
eventSchema.virtual('formattedDate')
  .get(function (){
    const momentTimeObj = moment(this.eventDateTime);
    return moment(momentTimeObj).format('dddd, MMMM Do YYYY');
  });
eventSchema.virtual('formattedTime')
  .get(function (){
    const momentTimeObj = moment(this.eventDateTime);
    return moment(momentTimeObj).format('HH:mm');
  });

eventSchema.virtual('placesRemaining')
  .get(function(){
    return this.capacity - this.guests.length;
  });

//  LIFECYCLE HOOKS

eventSchema.pre('validate', function getLatLon(next){
  console.log('Prevalidation hook fired');

  // make sure not to try process no postCode
  if(!this.location.postcode){
    this.invalidate('postCode', 'No match found');
  }

  //make the postcode consistent
  this.location.postcode = this.location.postcode.toLowerCase().replace(/\s/gi, '');
  rp({
    method: 'GET',
    url: `http://api.postcodes.io/postcodes/${this.location.postcode}`,
    json: true
  }).then(response => {
    console.log('the geocode response is====> ', response.result);
    this.location.lat = response.result.latitude;
    this.location.lon = response.result.longitude;
    next();
  });
});




//  --> geocode the postcode to a latlon // IDEA: we can use postcode.io to do this

//  --> convert the duration to milliseconds

//  --> drop all postcodes to lowercase and remove spaces

//NICE ROCKS EXAMPLE VIRTUAL
// reviewSchema.virtual('reviewedSubmitted')
//   .get(function(){
//     return this.createdAt.getFullYear();
//   });


module.exports = mongoose.model('Event', eventSchema);
