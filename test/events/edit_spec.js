/* globals describe, it, api, expect, beforeEach */

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

const eventData =
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
  };

const eventUpdateData =
  {                   //Calisthenics in the park
    category: 'mind',
    capacity: 3,
    concluded: true,
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
  };

let token; //token is global
let eventId; //to get a single event to edit

describe('POST /events', () => {
  beforeEach(done =>{
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign( {sub: user.id}, secret, {expiresIn: '1hr'} );

        //remove the Events and return so we can get its ID
        return Event.remove({});
      })
      .then(() => Event.create(eventData))
      .then(events => {
        eventId = events.id;
        done();
      });
  });

  it('should return a 401 without a token', done => {
    api.put(`/api/events/${eventId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 with a token', done => {
    api.put(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .send(eventUpdateData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .send(eventUpdateData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.put(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .send(eventUpdateData)
      .end((err, res) => {
        expect(res.body.eventTitle).to.eq(eventUpdateData.eventTitle);
        expect(res.body.concluded).to.eq(eventUpdateData.concluded);
        done();
      });
  });

});
