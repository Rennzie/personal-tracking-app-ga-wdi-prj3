const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  rating: { type: Number, default: 0 },
  content: { type: String, required: true },
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 },
  accessibility: String,
  tourGuideAvailability: Boolean,
  title: String
}, { timestamps: true });

reviewSchema.virtual('ratingSymbol')
  .get(function(){
    return getSymbol(this.rating);
  });

reviewSchema.virtual('reviewedSubmitted')
  .get(function(){
    return this.createdAt.getFullYear();
  });

reviewSchema.virtual('daysAgoCreated')
  .get(function(){
    const date2 = new Date();

    // Convert both dates to milliseconds
    const date1Ms = this.createdAt.getTime();
    const date2Ms = date2.getTime();

    // Calculate the difference in milliseconds
    const timeDifference = date2Ms - date1Ms;
    const oneMinute = 1000*60;
    const oneHour = oneMinute*60;
    const oneDay = oneHour*24;
    const oneYear = oneDay*365;

    const daysAgo = timeDifference/oneDay;
    const hoursAgo = timeDifference/oneHour;
    const minutesAgo = timeDifference/oneMinute;

    if(daysAgo > 365){
      return `${Math.round(daysAgo*oneYear)}Yrs Ago`;
    }else if(daysAgo >= 1){
      return `${Math.round(daysAgo)} Days Ago`;
    }else if(hoursAgo >= 1){
      return `${Math.round(hoursAgo)} Hours Ago`;
    }else if(minutesAgo >= 1){
      return `${Math.round(minutesAgo)} Minutes Ago`;
    }else{
      return 'Now';
    }
  })


const geoSiteSchema = new mongoose.Schema({
  coverPic: {type: String, required: true},
  name: {type: String, required: true},
  country: { type: String, require: true },
  period: String,
  age: Number,
  description: String,
  rockTypes: [ { type: String } ],
  region: String,
  images: [ {type: String } ],
  reviews: [ reviewSchema ],
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  mapLink: String,
  lat: Number,
  long: Number
}, { timestamps: true });


//create a virtual which calculates the average rating for a site.
//  --> reduce the reviews array down to a single Number
geoSiteSchema.virtual('averageRating')
  .get(function(){
    const reviewSum = this.reviews.reduce((accum, review) =>{
      return accum + review.rating;
    }, 0);

    const roundedAverage = (reviewSum/this.reviews.length).toFixed(2);

    return {symbol: getSymbol(roundedAverage), avgRating: roundedAverage};
  });

//format that age to 1000,000,000 become 1Ga
//  --> if > 1billion then age/1billtion return newAge + Ga

geoSiteSchema.virtual('formattedAge')
  .get(function(){
    if(this.age >= 1000000000){
      return `${(this.age/1000000000).toFixed(1)} Ga`;
    }else if(this.age >= 1000000){
      return `${(this.age/1000000).toFixed(1)} Ma`;
    }else if(this.age >= 1000){
      return `${(this.age/1000).toFixed(1)} Ka`;
    }else{
      return `${this.age} Yrs`;
    }
  });

geoSiteSchema.virtual('yearAdded')
  .get(function(){
    return this.createdAt.getFullYear();
  });




module.exports = mongoose.model('GeoSite', geoSiteSchema);



/////-useful functions-///////////

function getSymbol(rating){
  let ratingSymbols = rating;

  if(ratingSymbols >= 5){
    ratingSymbols = '🌋 🌋 🌋 🌋 🌋';
  }else if(ratingSymbols >= 4){
    ratingSymbols = '🌋 🌋 🌋 🌋 🗻';
  }else if(ratingSymbols >= 3){
    ratingSymbols = '🌋 🌋 🌋 🗻 🗻';
  }else if(ratingSymbols >= 2){
    ratingSymbols = '🌋 🌋 🗻 🗻 🗻';
  }else if(ratingSymbols >= 1){
    ratingSymbols = '🌋 🗻 🗻 🗻 🗻';
  }else{
    ratingSymbols = '😨';
  }

  return ratingSymbols;
}
