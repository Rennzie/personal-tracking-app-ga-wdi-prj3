const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

const User = require('../modles/user');
const Event = require('../modles/event');
const Goal = require('../modles/goal');

mongoose.connect(dbURI);
User.collection.drop();
Event.collection.drop();
Goal.collection.drop();

const userData = [
  {
    email: 'rnnsea001@gmail.com',
    firstName: 'Sean',
    homeLocation: {
      lat: 51.471337,
      lon: -0.184276
    },
    isHost: true,
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Rennie',
    username: 'Rennzie'
  },{
    email: 'mooapples@gmail.com',
    firstName: 'Kristi',
    homeLocation: {
      lat: 51.471337,
      lon: -0.184276
    },
    isHost: true,
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Sayer',
    username: 'MooApples'
  },{
    email: 'sophie.cornish@gmail.com',
    firstName: 'Sophie',
    homeLocation: { // NOTE: need address coordinates
      lat: ,
      lon:
    },
    isHost: false,
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Cornish',
    username: '???'
  },{
    email: 'trimhall@gmail.com',
    firstName: 'Tristan',
    homeLocation: { // NOTE: need address coordinates
      lat: ,
      lon:
    },
    isHost: false,
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
    eventDate: { type: Date, required: true }, // NOTE: need to convert a date to milliseconds
    guests: [],
    imageUrl: String, // NOTE: get a picture for seed
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
    eventDate: { type: Date, required: true }, // NOTE: need to convert a date to milliseconds
    guests: [],
    imageUrl: String, // NOTE: get a picture for seed
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
    eventDate: { type: Date, required: true }, // NOTE: need to convert a date to milliseconds
    guests: [],
    imageUrl: String, // NOTE: get a picture for seed
    isIndoors: true,
    location: {     // NOTE: get the address for GA london
      streetNumber: ,
      streetName: '',
      postcode: '',
      lat: ,
      lon:           // should seed this initially
    }
  }
];

const goalData = [
  {
    completedHrs: 10,
    discipline: 'body',
    goalMonth: 'august',
    targetHrs: 100
  },{
    completedHrs: 30,
    discipline: 'mind',
    goalMonth: 'august',
    targetHrs: 50
  },{
    discipline: 'soul',
    goalMonth: 'august',
    targetHrs: 100
  },{
    completedHrs: 10,
    discipline: 'body',
    goalMonth: 'august',
    targetHrs: 300
  },{
    completedHrs: 10,
    discipline: 'mind',
    goalMonth: 'august',
    targetHrs: 50
  },{
    completedHrs: 1,
    discipline: 'soul',
    goalMonth: 'august',
    targetHrs: 20
  },{
    completedHrs: 10,
    discipline: 'body',
    goalMonth: 'august',
    targetHrs: 100
  },{
    discipline: 'mind',
    goalMonth: 'august',
    targetHrs: 50
  },{
    completedHrs: 10,
    discipline: 'soul',
    goalMonth: 'august',
    targetHrs: 20
  }
]












///////////-WHISKEASE DATA-/////////
// User
//   .create(userData)
//   .then(users => {
//     console.log(`Created ${users.length} users.`);
//     whiskeyData[0].createdBy = users[0].id;
//     whiskeyData[1].createdBy = users[0].id;
//     return Whiskey.create(whiskeyData);
//   })
//   .then(whiskeys => {
//     console.log(`Created ${whiskeys.length} whiskeys.`);
//   })
//   .catch(err => console.log(err))
//   .finally(() => mongoose.connection.close());
