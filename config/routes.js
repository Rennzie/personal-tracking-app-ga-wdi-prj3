//BACK END ROUER

const express = require('express');
const Router = express.Router();

//Controllers
const eventController = require('../controllers/eventController');


//Secure Route Middleware


//=== ROUTES ===//

// AUTH ROUTES

console.log('Im in the router');

// EVENT ROUTES
Router.route('/events')
  .get(eventController.index);

// GOAL ROUTES


// USER ROUTES




module.exports = Router;
