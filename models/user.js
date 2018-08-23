const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const rp = require('request-promise');

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  postcodeHome: String,
  homeLocation: {
    lat: Number,
    lon: Number
  },
  hosterName: String,
  hasHostName: { type: Boolean, default: false },
  imageUrl: {type: String, default: 'https://www.fumcpahokee.org/wp-content/uploads/2016/12/staff-profile-placeholder.jpg'},
  isHost: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true }
}, { timestamps: true });


//Hashed password verification to be used with authController
userSchema.methods.validatePassword = function(password){
  //compare the password from the form against the has in the db
  return bcrypt.compareSync(password, this.password);
};


////////////--VIRTUALS--//////////////
userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.virtual('memberSince')
  .get(function(){
    return this.createdAt.getFullYear();
  });

//Pre validation hooks
userSchema.pre('validation', function(next){
  console.log('Prevalidation hook fired');
  if(this.passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'Does not match');
  }
  next();
});

userSchema.pre('validate', function getLatLon(next){
  console.log('user latlon Prevalidation hook fired');

  // make sure not to try process no postCode
  if(!this.postcodeHome){
    this.invalidate('postCode', 'No match found');
  }

  //make the postcode consistent
  this.postcodeHome = this.postcodeHome.toLowerCase().replace(/\s/gi, '');
  rp({
    method: 'GET',
    url: `http://api.postcodes.io/postcodes/${this.postcodeHome}`,
    json: true
  }).then(response => {
    this.homeLocation.lat = response.result.latitude;
    this.homeLocation.lon = response.result.longitude;
    next();
  }).catch(() => {
    // Postcode wasn't found
    console.log('Failed on postcode', this.postcodeHome);
    // this.invalidate('postCode', `Failed to look up postcode ${this.lpostcodeHome}`);
    next();
  });
});

//Pre save hooks
userSchema.pre('save', function(next){
  // console.log('Pre save fired');
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

userSchema.post('save', function(){
  // console.log('Password was hashed', this.password);
});


module.exports = mongoose.model('User', userSchema);
