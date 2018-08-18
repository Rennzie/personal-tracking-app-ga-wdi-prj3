/* globals describe, it, xit, api, expect, beforeEach */

//The secureRoute function should
//  --> check if a token is supplied, return 401 if
//  --> check the validity of the token that has been supplied
//  --> check that there is a user in the DB if a token is Supplied
//  --> verify the token

//imported modules
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');


//test userData
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

const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Yjc2YzgxMDc5MTQzYmVhZTU4ODRjMGMiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTM0NTExMTI0LCJleHAiOjE1MzQ1MTQ3MjR9.1FR13jv_iyi4FdOYj6tWHbJR-fl0nofQg3LplJkwblY';
let token;

describe('secureRoute via POST /api/events', () => {
  //before each, add a user and an animal
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({sub: user.id}, secret, {expiresIn: '1hr'});
        done();
      });
  });

  it('should return a 401 and a No Token Supplied message if a token is not supplied', done => {
    api.post('/api/events')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('No Token Supplied');
        done();
      });
  });

  it('should return a 401 and an Invalid Token message if the supplied token is not valid', done => {
    api.post('/api/events')
      .set({Authorization: `Bearer ${expiredToken}`})
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('Invalid Token');
        done();
      });
  });

  xit('should check that only a host can create/edit/delete events');

  xit('should return a 401 and a User Not Found  message if there is no user in the db', done => {
    api.post('/api/events')
      .set({Authorization: `Bearer ${token}`})
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('User Not Found');
        done();
      });
  });

  //// NOTE: need to directly test the secure route without going through a request?
  xit('should return true if the token is verified', done => {
    api.post('/api/events')
      .set({Authorization: `Bearer ${token}`})
      .end((err, res) => {
        done();
      });
  });
});
