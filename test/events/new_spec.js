/* globals describe, it, api expect, beforeEach */

const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');
const userData = {
  email: 'rnnsea001@gmail.com',
  firstName: 'Sean',
  postcodeHome: 'Sw6 2tg',
  password: 'pass',
  surname: 'Rennie',
  username: 'pass'
};

const eventData ={
  category: 'Body',
  capacity: 3,
  durationHrs: 1,
  description: 'Small group Calisthenics training focussed on intermediate athletes looking to get better at handstands and muscle ups',
  eventTitle: 'Calisthenics in the Park',
  eventDateTime: 'Thu Oct 11 2018 22:30:00 GMT+0100 (British Summer Time)',
  guests: [],
  imageUrl: 'https://athleticmuscle-aoukphiqubz0bq.netdna-ssl.com/wp-content/uploads/2018/01/Calisthenics-759x500.jpg',
  isIndoors: false,
  location: {     //sub document to hold event location
    streetNumber: 9,
    streetName: 'Greensward',
    postcode: 'sw62tg'
  }
};

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

  it('should return a 401 without a token', done => {
    api.post('/api/events')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 with a token', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .send(eventData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .send(eventData)
      .end((err, res) => {
        // console.log('The response is', res.body);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .send(eventData)
      .end((err, res) => {
        expect(res.body.eventTitle).to.eq(eventData.eventTitle);
        expect(res.body.durationHrs).to.eq(eventData.durationHrs);
        done();
      });
  });

});
