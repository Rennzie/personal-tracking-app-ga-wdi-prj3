const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');

function secureRoute( req, res, next){
  //if there is no token supplied
  if(!req.headers.authorization){
    return res.status(401).json({message: 'No Token Supplied'});
  }

  //remove bearer from the supplied token
  const token = req.headers.authorization.replace('Bearer ', '');

  function handleVerify(err, result){
    // console.log('the result is ', result.sub);
    if(err){
      return res.status(401).json({ message: 'Invalid Token'});
    }

    //check there is a user and add it to the req.user
    User
      .findById(result.sub)
      .then(user => {
        if(!user) {
          // console.log('The user should be ', user);
          return res.status(401).json({message: 'User Not Found'});
        }
        // res.status(201);
        req.user = user;
        return next();
      });
  }

  jwt.verify(token, secret, handleVerify);
}

module.exports = secureRoute;
