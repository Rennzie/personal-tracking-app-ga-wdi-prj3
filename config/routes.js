//BACK END ROUTER

const express = require('express');
const Router = express.Router();

//Controllers
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const goalController = require('../controllers/goalController');

//external API Controllers
const weatherController = require('../controllers/externalApis/weatherController');
const travelController = require('../controllers/externalApis/travelController');



//Secure Route Middleware
const secureRoute = require('../lib/secureRoute');

//=== ROUTES ===//

// AUTH ROUTES
Router.route('/register')
  .post(authController.register);

Router.route('/login')
  .post(authController.login);

// USER ROUTES
Router.route('/users')
  .get(userController.index);

Router.route('/users/:id')
  // .all(secureRoute)
  .get(userController.show)
  .put(userController.update);

// EVENT ROUTES
Router.route('/events')
  .get(eventController.index)
  .post( eventController.create);     // NOTE: we will secure this route

Router.route('/events/:id')
  .get(eventController.show)
  .put( eventController.update)      // NOTE: we will secure this route
  .delete( eventController.delete);  // NOTE: we will secure this route

Router.route('/events/:id/guests')
  .all(secureRoute)
  .post(eventController.addNewGuest);

Router.route('/events/:eventId/guests/:guestId')
  .delete(eventController.guestDelete); // NOTE: need to secure this

// GOAL ROUTES // NOTE: no need to secure as this is done by the userprofile controller
Router.route('/users/:userId/goals')
  .get(goalController.index)
  .post(goalController.create);

Router.route('/users/:userId/goals/:goalId')
  .get(goalController.show)
  .put(goalController.update)
  .delete(goalController.delete);

Router.route('/goals/:id/loghours')
  .all(secureRoute)
  .put(goalController.log);

//////===== EXTERNAL API'S =========/////////
// WEATHER ROUTES
Router.route('/forecast')
  .get(weatherController.forecast);

//TRAVEL ROUTES
Router.route('/citymapper/traveltime')
  .get(travelController.travelTime);



module.exports = Router;
