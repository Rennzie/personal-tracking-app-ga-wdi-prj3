const express = require('express');
const router = express();

//CONTROLLER MODULES
const registrationController = require('../controllers/registrationController');
const sessionController = require('../controllers/sessionController');
const geoSiteController = require('../controllers/geoSiteController');
const reviewController = require('../controllers/reviewController');
const userProfileController = require('../controllers/userProfileController');
const followController = require('../controllers/followController');

//SECURE ROUTES
function secureRoute(req, res, next){
  //check if user is logged in, send message if note
  if(!req.session.userId){
    //user is not logged in Disallow!
    return req.session.regenerate(() => {
      //req.flash('danger', 'Log in to make edits!');
      res.redirect('/session/new');
    });
  }

  return next();
}

//GLOBAL ROUTES
router.route('/')
  .get( (req, res) => res.render('pages/home'));

router.route('/about')
  .get( (req, res) => res.render('pages/about'));

//  --> Registrations
router.route('/registration/new')
  .get(registrationController.new);

router.route('/registration')
  .post(registrationController.create);

//  --> User Profile
router.route('/userprofile/:id')
  .get(userProfileController.show);

//  --> Sessions
router.route('/session/new')
  .get(sessionController.new);

router.route('/session')
  .post(sessionController.create);     //to create a new user cookie

router.route('/session/delete')
  .get(secureRoute, sessionController.delete); //to LOGOUT and regenerate a cookie

//  --> GeoSites
router.route('/geoSites')
  .get(geoSiteController.index)   //view all geosites
  .post(secureRoute, geoSiteController.create); //Add a new site

router.route('/geoSites/new')
  .get(secureRoute, geoSiteController.new);  //Add a new site

router.route('/geoSites/:id/edit')
  .get(geoSiteController.edit);

router.route('/geoSites/:id')
  .get(geoSiteController.show)
  .put(geoSiteController.update)
  .delete(geoSiteController.delete);

//  --> Site Reviews
router.route('/geoSites/:siteId/review/new')
  .get(secureRoute, reviewController.new);

router.route('/geoSites/:siteId/review')
  .post(secureRoute, reviewController.create);

router.route('/geoSites/:siteId/review/:reviewId')
  .delete(secureRoute, reviewController.delete)
  .put(secureRoute, reviewController.update);

router.route('/geoSites/:siteId/review/:reviewId/edit')
  .get(secureRoute, reviewController.edit);

//  --> Following
router.route('/followSite')
  .post(followController.site);


module.exports = router;
