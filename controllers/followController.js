const User = require('../models/user');

function followSite( req, res ){
  User // NOTE: find one is getting a string not an object
    .findOne(req.body.userId)
    .then(user => {
      user.followedSites.push(req.body.site);
      return req.headers.referer;
    })
    .then(prevPage => res.redirect(prevPage));
}

module.exports = {
  site: followSite
};
