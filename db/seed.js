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
    isHost: false,
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Rennie',
    username: 'Rennzie'
  }
];

const eventData = [
  {
    addedBy: {type: ObjectId, ref: 'User'},
    completedHrs: Number, //accumulation of events completed duration
    discipline: { type: String, required: true }, //mind, body, soul
    goalMonth: String, //if we user the current month then timestamps takes care of this
    targetHrs: Number //supplied by user

  }
];

const goalData = [
  {

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
