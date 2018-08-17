/* globals describe, it, api, expect, beforeEach */

const User = require('../../models/user');
const Event = require('../../models/event');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const userData =

const eventData =

let token; //token is global
let eventId;

describe('DELETE /whiskeys/:id', () => {
  beforeEach(done =>{
    //Now create  the users
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign( {sub: user.id}, secret, {expiresIn: '1hr'} );
        return Event.remove({});
      })
      .then(() => Event.create(eventData))
      .then(events => {
        eventId = events.id;
        done();
      });
  });


  it('should return a 401 without a token', done => {
    api.delete(`/api/event/${eventId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 with a token', done => {
    api.delete(`/api/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .end((err, res) => {
        console.log('the event ID is ', eventId);
        expect(res.status).to.eq(204); //No content
        done();
      });
  });

  it('should delete the whiskey', done => {
    api.delete(`/api/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`) // creates an authorisation header
      .then(() => Event.find())
      .then(events => {
        expect(whiskeys.length).to.eq(0);
        done();
      });
  });
});
