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

const updateUserData = {
  email: 'sean.rennie6@gmail.com',
  firstName: 'Sean',
  isHost: false,
  password: 'pass',
  passwordConfirmation: 'pass',
  username: 'Rennzie'
};


let userId;
let token;

describe('PUT /api/user/:id', () => {
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


  it('should return a 401 without a token', done => {
    api.put(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 response with a token', done => {
    api.put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .send(updateUserData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return the correct data', done => {
    api.put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .send(updateUserData)
      .end((err, res) => {
        expect(res.body.isHost).to.eq(updateUserData.isHost);
        expect(res.body.email).to.eq(updateUserData.email);
        done();
      });
  });
});
