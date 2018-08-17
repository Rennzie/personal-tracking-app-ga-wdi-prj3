/* globals describe, it, api, xit expect, beforeEach */

const User = require('../../models/user');
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

describe('POST /events', () => {
  beforeEach(done =>{
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign( {sub: user.id}, secret, {expiresIn: '1hr'} );
        done();
      });
  });

  xit('should return a 401 without a token', done => {
    api.post('/api/events')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  xit('should return a 201 with a token', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .send(eventData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  xit('should return an object', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .send(eventData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  xit('should return the correct data', done => {
    api.post('/api/events')
      //.set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .send(eventData)
      .end((err, res) => {
        expect(res.body.eventTitle).to.eq(eventData.eventTitle);
        expect(res.body.eventDate).to.eq(eventData.eventDate);
        done();
      });
  });

});
