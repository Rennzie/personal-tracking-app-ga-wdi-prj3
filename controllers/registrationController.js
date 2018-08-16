const User = require('../models/user');

function registrationNew( req, res ){
  res.render('registrations/new');
}

function registrationCreate( req, res){
  User
    .create( req.body )
    .then( user => {
      console.log('We have created a new user:', user);
      req.session.userId = user.id;
      res.redirect( `/userprofile/${user.id}`);
    })
    .catch( () => res.status(500).redirect('/registration/new'));
}

module.exports = {
  new: registrationNew,
  create: registrationCreate
};
