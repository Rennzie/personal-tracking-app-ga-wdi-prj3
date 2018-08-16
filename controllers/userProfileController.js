const User = require('../models/user');
const GeoSite = require('../models/geoSite');


//will need to pass the profile the users reviews and followed sites
function userProfileShow ( req, res ){
  let _user;
  User
    .findById(req.params.id)
    .then(user => {
      _user = user;
      return user.reviewsCreated();
    })
    .then(reviews => {
      console.log('the reviews are: ', reviews);
      res.render('userProfile/show', {_user, reviews});
    });
}

module.exports = {
  show: userProfileShow
};
