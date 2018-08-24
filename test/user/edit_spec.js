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

const updateUserData = {
  email: 'sean.rennie6@gmail.com',
  firstName: 'SEAN',
  postcodeHome: 'Sw6 2tg',
  password: 'pass',
  surname: 'Jones',
  username: 'pass'
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
        expect(res.body.surname).to.eq(updateUserData.surname);
        expect(res.body.email).to.eq(updateUserData.email);
        done();
      });
  });
});
