const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

const User = require('../models/user');
const Event = require('../models/event');
const Goal = require('../models/goal');

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
    homeLocation: {
      lat: 51.502972,
      lon: -0.191837
    },
    isHost: true,
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Cornish',
    username: '???'
  },{
    email: 'trimhall@gmail.com',
    firstName: 'Tristan',
    homeLocation: {
      lat: 51.371835,
      lon: -0.100976
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
    eventDate: 1534978800000,
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
    eventDate: 1535065200000,
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
    eventDate: 1536966000000,
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
];


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

    goalData.forEach(goal => {
      const randomIndex = Math.floor(Math.random() * users.length);
      goal.createdBy = users[randomIndex];
    });

    //add a user to any reviews inthe event reviews

    return Event.create(eventData);
  })
  .then(events => {
    console.log(`Create ${events.length} events`);

    return Goal.create(goalData);

  })
  .then(goals => console.log(`Create ${goals.length} events`))
  .catch(err => console.log('Seeding error is', err))
  .finally(() => mongoose.connection.close());









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
