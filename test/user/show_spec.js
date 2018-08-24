/* globals describe, it, api, expect, beforeEach */
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


let userId;
let token;

describe('GET /api/user/:id', () => {
  //load user data and get an ID
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign( {sub: user.id}, secret, {expiresIn: '1hr'} );
        userId = user.id;
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 with a token', done => {
    api.get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct user data', done => {
    api.get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .end((err, res) => {
        expect(res.body.email).to.eq(userData.email);
        expect(res.body.postcodeHome).to.eq(userData.postcodeHome.toLowerCase().replace(/\s/gi, ''));
        expect(res.body.username).to.eq(userData.username);
        done();
      });
  });
});
