/* globals describe, it, api, expect, beforeEach */

const User = require('../../models/user');
const Goal = require('../../models/goal');

const userData =
  {
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

const goalData = [
  {
    completedHrs: 10,
    discipline: 'body',
    goalMonth: 'august',
    targetHrs: 100
  },{
    completedHrs: 30,
    discipline: 'mind',
    goalMonth: 'august',
    targetHrs: 50
  },{
    discipline: 'soul',
    goalMonth: 'august',
    targetHrs: 100
  },{
    completedHrs: 10,
    discipline: 'body',
    goalMonth: 'august',
    targetHrs: 300
  },{
    completedHrs: 10,
    discipline: 'mind',
    goalMonth: 'august',
    targetHrs: 50
  },{
    completedHrs: 1,
    discipline: 'soul',
    goalMonth: 'august',
    targetHrs: 20
  },{
    completedHrs: 10,
    discipline: 'body',
    goalMonth: 'august',
    targetHrs: 100
  },{
    discipline: 'mind',
    goalMonth: 'august',
    targetHrs: 50
  },{
    completedHrs: 10,
    discipline: 'soul',
    goalMonth: 'august',
    targetHrs: 20
  }
];

let userId;

describe('GET /user/:id/goals', ()=> {
  //load user data and goal data before each
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user.Id;

        goalData.forEach(goal => goal.createdBy = user.id);

        return Goal.remove({});
      })
      .then(() => Goal.create(goalData))
      .then(() => done());
  });

  xit('should return a 200 response status', done => {
    api.get(`/api/users/${userId}/goals`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  xit('should return an array with object items', done => {
    api.get(`/api/users/${userId}/goals`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach(goal => expect(goal).to.be.an('object'));
        done();
      });
  });

  xit('should return the correct data');

  xit('should only return data for the given users ID');
});
