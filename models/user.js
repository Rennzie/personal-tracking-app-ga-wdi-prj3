const mongoose = require('mongoose');
const rp = require('request-promise'); //Make HTTP resuest on the back-end to external API's

const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  homeLocation: {
    lat: Number,
    lon: Number
  },
  hosterName: String,
  hasHostName: { type: Boolean, default: false },
  imageUrl: String,
  isHost: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, required: true },
  homePostcode: String,
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

userSchema.virtual('homeLocation')
  .set(function() {
    const postcode = this.postcode.replace(/' '/g, '').toLowerCase();
    rp({
      method: 'GET',
      url: `http://api.postcodes.io/postcodes/${postcode}`
    })
      .then(result => {
        
      });
  })

//Pre validation hooks
userSchema.pre('validation', function(next){
  console.log('Prevalidation hook fired');
  if(this.passwordConfirmation !== this.password){
    console.log('Passwords did not match');
    this.invalidate('passwordConfirmation', 'Does not match');
  }
  next();
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
