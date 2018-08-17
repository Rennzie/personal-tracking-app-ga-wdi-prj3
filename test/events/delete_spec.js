/* globals describe, it, xit, api, expect, beforeEach */

const User = require('../../models/user');
const Event = require('../../models/event');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const userData = {
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
};

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
  }
];

let token; //token is global
let eventId;

describe('DELETE /whiskeys/:id', () => {
  beforeEach(done =>{
    //Now create  the users
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign( {sub: user.id}, secret, {expiresIn: '1hr'} );
        return Event.remove({});
      })
      .then(() => Event.create(eventData))
      .then(events => {
        eventId = events.id;
        done();
      });
  });


  xit('should return a 401 without a token', done => {
    api.delete(`/api/event/${eventId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  xit('should return a 204 with a token', done => {
    api.delete(`/api/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .end((err, res) => {
        console.log('the event ID is ', eventId);
        expect(res.status).to.eq(204); //No content
        done();
      });
  });

  xit('should delete the whiskey', done => {
    api.delete(`/api/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .then(() => Event.find())
      .then(events => {
        expect(events.length).to.eq(0);
        done();
      });
  });
});
