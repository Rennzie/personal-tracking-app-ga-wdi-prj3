const mongoose = require('mongoose');
// User bluebird to make promises easier
mongoose.Promise = require('bluebird');

// connect to Mongo using our dbURI
const { dbURI } = require('../config/environment');

// Import all the models
const User = require('../models/user');
const Event = require('../models/event');
const Goal = require('../models/goal');

mongoose.connect(dbURI);

// Clear out the collections before we add data again
User.collection.drop();
Event.collection.drop();
Goal.collection.drop();

// All our seed data in arrays
const userData = [
  {
    email: 'rnnsea001@gmail.com',
    firstName: 'Sean',
    homeLocation: {
      lat: 51.471337,
      lon: -0.184276
    },
    isHost: false,
    imageUrl: 'https://i.stack.imgur.com/IHLNO.jpg',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Rennie',
    username: 'Rennzie',
    isAdmin: true
  },{
    email: 'mooapples@gmail.com',
    firstName: 'Kristi',
    homeLocation: {
      lat: 51.471337,
      lon: -0.184276
    },
    isHost: true,
    imageUrl: 'https://i.stack.imgur.com/IHLNO.jpg',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Sayer',
    username: 'MooApples'
  },{
    email: 'sophie.cornish@gmail.com',
    firstName: 'Sophie',
    homeLocation: {
      lat: 51.502972,
      lon: -0.191837
    },
    isHost: true,
    imageUrl: 'https://i.stack.imgur.com/IHLNO.jpg',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Cornish',
    username: 'Scornish',
    isAdmin: true
  },{
    email: 'trimhall@gmail.com',
    firstName: 'Tristan',
    homeLocation: {
      lat: 51.371835,
      lon: -0.100976
    },
    isHost: false,
    imageUrl: 'https://i.stack.imgur.com/IHLNO.jpg',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Hall',
    username: 'TrimHall'
  }
];

const eventData = [
  {                   //Calisthenics in the park
    category: 'body',
    capacity: 3,
    concluded: false,
    duration: 60,
    description: 'Small group Calisthenics training focussed on intermediate athletes looking to get better at handstands and muscle ups',
    eventTitle: 'Calisthenics in the Park',
    eventDateTime: 'Thu Oct 11 2018 22:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'http://www.bjj-usa.com/wp-content/uploads/2017/08/calisthenics-benefits-6.jpg',
    isIndoors: false,
    location: {     //sub document to hold event location
      streetNumber: 9,
      streetName: 'Greensward',
      postcode: 'sw62tg',
      lat: 51.471337,
      lon: -0.184276          // should seed this initially
    }
  }, {
    category: 'soul',
    capacity: 5,
    concluded: false,
    duration: 45,
    description: 'Home hosted hatha yoga training',
    eventTitle: 'Hatha at Home',
    eventDateTime: 'Thu Oct 11 2018 22:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'http://s3.amazonaws.com/images-s3.yogainternational.com/assets/content/articles/How_To_Get_Better_at_Yoga.jpg',
    isIndoors: true,
    location: {     //sub document to hold event location
      streetNumber: 9,
      streetName: 'Greensward',
      postcode: 'sw62tg',
      lat: 51.023452,
      lon: -0.184276          // should seed this initially
    }
  }, {
    category: 'mind',
    capacity: 30,
    concluded: true,
    duration: 45,
    description: 'Start your coding journey by kick starting your skill set with HTML5 and CSS basics. This General Assembly short course will give you a taste for what front end develoers could be tackling on a daily basis',
    eventTitle: 'HTML5 and CSS3 Bootcamp',
    eventDateTime: 'Thu Oct 11 2018 22:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://generalassemb.ly/blog/wp-content/uploads/2014/08/dash1.png',
    isIndoors: true,
    location: {
      streetNumber: 114,
      streetName: 'White Chapel High St',
      postcode: 'E1 7PT',
      lat: -0.072513,
      lon: 51.515379          // should seed this initially
    }
  }
];

const goalData = [
  {
    month: 'August', //if we user the current month then timestamps takes care of this
    mindTarget: 100,
    bodyTarget: 20,
    soulTarget: 10
  },{
    month: 'August', //if we user the current month then timestamps takes care of this
    mindTarget: 10,
    bodyTarget: 200,
    soulTarget: 50,
    bodyCompleted: 100
  },{
    month: 'August', //if we user the current month then timestamps takes care of this
    mindTarget: 54,
    bodyTarget: 30,
    soulTarget: 26,
    mindCompleted: 100
  }
];


// data created, ready to start seeding
User
  .create(userData)
  .then(users => {
    console.log(`Created ${users.length} users`);
    //add a user id to Event created by
    eventData[0].createdBy = users[0].id;
    eventData[1].createdBy = users[1].id;
    eventData[2].createdBy = users[2].id;

    // push many users into the attending event array
    users.forEach(user => eventData[0].guests.push(user.id));
    users.forEach(user => eventData[1].guests.push(user.id));
    users.forEach(user => eventData[2].guests.push(user.id));

    //add a user to each of the created goals
    goalData[0].createdBy = users[0].id;
    goalData[1].createdBy = users[1].id;
    goalData[2].createdBy = users[2].id;

    // data populated with user id's, return to chain another .then()
    return Event.create(eventData);
  })
  .then(events => {
    //events created in DB, log them
    console.log(`Create ${events.length} events`);

    //create goals and return them so we can log them
    return Goal.create(goalData);
  })
  .then(goals => console.log(`Create ${goals.length} goals`))
  .catch(err => console.log('Seeding error is', err))
  .finally(() => mongoose.connection.close());
