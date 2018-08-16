const User = require('../models/user');

function sessionNew( req, res ){
  const prevPage = req.headers.referer;
  res.render('sessions/new', { prevPage });
}

function sessionCreate( req, res ){
  User
    .findOne({userName: req.body.userName})
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)){
        // console.log('the password is: ', req.body.password);
        // console.log('No username or passwords dont match');
        res.status(401).render('sessions/new', {message: 'Try that again'});
      }else{
        const prevPage = req.body.prevPage;
        console.log(prevPage);
        req.session.userId = user.id;
        req.flash('success', `Welcome back ${req.body.userName}`);
        if(prevPage === 'http://localhost:8000/'){
          res.redirect('/geoSites');
        }else if(prevPage.match(/registration/)){
          res.redirect(`/userprofile/${user.id}`);
        } else{
          res.redirect(req.body.prevPage);

        }
      }
    });
}

function sessionDelete( req, res ){
  return req.session.regenerate(() => {  //this gives a brand new cookie
    req.flash('danger', 'You have been logged out!');
    res.redirect('/');
  });
}

module.exports = {
  new: sessionNew,
  create: sessionCreate,
  delete: sessionDelete
};
