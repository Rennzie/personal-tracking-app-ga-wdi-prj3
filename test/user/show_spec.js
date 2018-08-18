/* globals describe, it, api, expect, beforeEach */
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


let userId;
let token;

describe('GET /api/user/:id', () => {
  //load user data and get an ID
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign( {sub: user.id}, secret, {expiresIn: '1hr'} );
        token = user.id;
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/user/${userId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a 401 without a token', done => {
    api.put(`/api/events/${userId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/events/${userId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .end((err, res) => {
        expect(res.body[0]).to.be.an('object');
        done();
      });
  });

  it('should return the correct user data', done => {
    api.put(`/api/events/${userId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .end((err, res) => {
        expect(res.body.email).to.eq(userData.email);
        expect(res.body.isHost).to.eq(userData.isHost);
        expect(res.body.username).to.eq(userData.username);
        expect(res.body.homeLocation).to.eq(userData.homeLocation);
        done();
      });
  });
});
