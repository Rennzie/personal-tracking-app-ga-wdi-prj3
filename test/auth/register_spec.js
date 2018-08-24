/* globals describe, it, api, expect, beforeEach */

const User = require('../../models/user');

//test userData
const userData = {
  email: 'rnnsea001@gmail.com',
  firstName: 'Sean',
  postcodeHome: 'Sw6 2tg',
  password: 'pass',
  surname: 'Rennie',
  username: 'pass'
};

describe('POST /api/register', () => {
  //before each test should create a new user to test without
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should recieve 201 status if user is created successfully', done => {
    api.post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });

  });

  // it('should return the correct data', done => {
  //   api.post('/api/events')
  //     //.set('Authorization', `Bearer ${token}`) // creates an authorisation header
  //     .send(userData)
  //     .end((err, res) => {
  //       expect(res.body.email).to.eq(userData.email);
  //       expect(res.body.firstName).to.eq(userData.firstName);
  //       expect(res.body.isHost).to.eq(userData.isHost);
  //       expect(res.body.surname).to.eq(userData.surname);
  //       expect(res.body.username).to.eq(userData.username);
  //       done();
  //     });
  // });
});
