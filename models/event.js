const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const rp = require('request-promise');
const moment = require('moment');
moment().format();

const eventSchema = mongoose.Schema({
  createdBy: {type: ObjectId, ref: 'User'}, //hosting user
  category: { type: String, required: true },
  capacity: Number,
  durationHrs: { type: Number, default: 0 },  // NOTE: might be best to convert to millisecondss
  durationMin: { type: Number, default: 0 },  // NOTE: might be best to convert to millisecondss
  description: String,
  eventTitle: { type: String, required: true },
  eventDateTime: { type: String, required: true },
  eventDateUnix: Number,
  guests: [ { type: ObjectId, ref: 'User'} ], //to hold all users attending the event
  imageUrl: {type: String, default: 'https://waterstart.com/wp-content/uploads/2017/05/event-placeholder.jpg'},
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
    return moment(momentTimeObj).format('dddd, MMMM Do');
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

eventSchema.virtual('duration')
  .get(function(){
    const formatHourSuffix = this.durationHrs > 1 ? 'Hrs' : 'Hr';
    const formatMinuteSuffix = this.durationMin > 1 ? 'Mins' : 'Min';

    if(!this.durationHrs && this.durationMin){
      return `${this.durationMin} ${formatMinuteSuffix}`;

    }else if(this.durationHrs && !this.durationMin === 0){
      return `${this.durationHrs} ${formatHourSuffix}`;
    }else{
      return `${this.durationHrs} ${formatHourSuffix} & ${this.durationMin} ${formatMinuteSuffix}`;
    }
  });

eventSchema.virtual('concluded')
  .get(function(){
    const todayUnix = moment().unix();
    if(this.eventDateUnix > todayUnix){
      return false;
    }else{
      return true;
    }
  });


//  LIFECYCLE HOOKS
eventSchema.pre('save', function setUnixDate(next){
  this.eventDateUnix = moment(this.eventDateTime).unix(); //this.eventDateTime format could cause issues with moment in the future
  next();
});

eventSchema.pre('validate', function getLatLon(next){
  // console.log('get LatLon Prevalidation hook fired');

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
    this.location.lat = response.result.latitude;
    this.location.lon = response.result.longitude;
    next();
  })
    .catch(() => {
      // Postcode wasn't found
      console.log('Failed on postcode: ', this.location.postcode);
      // this.invalidate('postCode', `Failed to look up postcode ${this.location.postcode}`);
      next();
    });
});

module.exports = mongoose.model('Event', eventSchema);
