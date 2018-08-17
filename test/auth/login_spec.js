/* globals describe, it, api, expect, beforeEach */


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

const userLogin = {
  email: 'rnnsea001@gmail.com',
  password: 'pass'
};

describe('POST /api/login', () => {
  //before each test should create a new user to test without
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should recived a 401 status and message if incorrect credentials', done => {
    api.post('/api/login')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('Invalid password or username!');
        done();
      });
  });

  it('should recieve 201 status if the login is successful', done => {
    api.post('/api/login')
      .send(userLogin)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });

  });

  it('should return a valid jwt token', done => {
    api.post('/api/login')
      .send(userLogin)
      .end((err, res) => {
        console.log('jwt verify is', jwt.verify(res.body.token, secret));
        expect(jwt.verify(res.body.token, secret)).to.ok;
        done();
      });

  });
});
