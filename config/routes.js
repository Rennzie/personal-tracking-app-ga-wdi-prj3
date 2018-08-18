//BACK END ROUER

const express = require('express');
const Router = express.Router();

//Controllers
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


//Secure Route Middleware
const secureRoute = require('../lib/secureRoute');

//=== ROUTES ===//

// AUTH ROUTES
Router.route('/register')
  .post(authController.register);

Router.route('/login')
  .post(authController.login);

// USER ROUTES
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

// GOAL ROUTES






module.exports = Router;
