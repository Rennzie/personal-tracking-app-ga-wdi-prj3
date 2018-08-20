//BACK END AUTH CONTROLLER

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register( req, res, next ){
  User
    .create(req.body)
    .then(user => res.status(201).json({ message: 'Created new user', user}))
    .catch(next);
}

function login( req, res, next ){
  User
    .findOne({email: req.body.email})
    .then(user => {

      //queried DB and maybe found a user, check we have one and validate the password
      if(!user || !user.validatePassword(req.body.password)){
        return res.status(401).json({ message: 'Invalid password or username!'});
      }
      //user is authenticated

      //data for jsonwebtoken vvvvvvv
      let payload;
      if(user.isAdmin) { //set admin on token
        payload = { sub: user.id, admin: true };
      }else{
        payload = { sub: user.id, admin: false };
      }
      const options = {expiresIn: '1hr'};

      const token = jwt.sign(payload, secret, options);
      //^^^^^^^^^required args are (payload, secret, options)
      //more jwt options on jwt.io documentation page

      // console.log('create token ', token);
      return res.status(201).json({ message: `Welcome back ${user.firstName}!`, token});
    })
    .catch(next);
}

module.exports = {
  login,
  register
};
