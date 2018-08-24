/* globals describe, it, api, expect, beforeEach */

const User = require('../../models/user');
const Goal = require('../../models/goal');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const userData ={
  email: 'rnnsea001@gmail.com',
  firstName: 'Sean',
  postcodeHome: 'Sw6 2tg',
  password: 'pass',
  surname: 'Rennie',
  username: 'pass'
};

const goalData = {
  mindTarget: 100,
  bodyTarget: 100,
  soulTarget: 100,
  mindCompleted: 50,
  bodyCompleted: 50,
  soulCompleted: 50
};

let userId;
let token;

describe('GET /user/:id/goals', ()=> {
  //load user data and goal data before each
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user.Id;
        token = jwt.sign({sub: user.id}, secret, {expiresIn: '1hr'});

        goalData.forEach(goal => goal.createdBy = user.id);

        return Goal.remove({});
      })
      .then(() => Goal.create(goalData))
      .then(() => done());
  });

  it('should return a 401 response status without a token', done => {
    api.get(`/api/users/${userId}/goals`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response status with a token', done => {
    api.get(`/api/users/${userId}/goals`)
      .set({Authorization: `Bearer ${token}`})
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/users/${userId}/goals`)
      .set({Authorization: `Bearer ${token}`})
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/users/${userId}/goals`)
      .set({Authorization: `Bearer ${token}`})
      .end((err, res) => {
        console.log('goaldata is =====> ', res.body);
        done();
      });
  });

  xit('should only return data for the given users ID');
});
