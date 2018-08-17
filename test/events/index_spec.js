/* globals describe, it, api, expect, beforeEach */

const eventData = [
  {                   //Calisthenics in the park
    category: 'body',
    capacity: 3,
    concluded: false,
    duration: 60,
    description: 'Small group Calisthenics training focussed on intermediate athletes looking to get better at handstands and muscle ups',
    eventTitle: 'Calisthenics in the Park',
    eventDate: 1534978800000,
    guests: [],
    imageUrl: 'http://www.bjj-usa.com/wp-content/uploads/2017/08/calisthenics-benefits-6.jpg',
    isIndoors: false,
    location: {     //sub document to hold event location
      streetNumber: 9,
      streetName: 'Greensward',
      postcode: 'sw62tg',
      lat: 51.471337,
      lon: -0.184276          // should seed this initially
    }
  }, {
    category: 'soul',
    capacity: 5,
    concluded: false,
    duration: 45,
    description: 'Home hosted hatha yoga training',
    eventTitle: 'Hatha at Home',
    eventDate: 1535065200000,
    guests: [],
    imageUrl: 'http://s3.amazonaws.com/images-s3.yogainternational.com/assets/content/articles/How_To_Get_Better_at_Yoga.jpg',
    isIndoors: true,
    location: {     //sub document to hold event location
      streetNumber: 9,
      streetName: 'Greensward',
      postcode: 'sw62tg',
      lat: 51.023452,
      lon: -0.184276          // should seed this initially
    }
  }, {
    category: 'mind',
    capacity: 30,
    concluded: true,
    duration: 45,
    description: 'Start your coding journey by kick starting your skill set with HTML5 and CSS basics. This General Assembly short course will give you a taste for what front end develoers could be tackling on a daily basis',
    eventTitle: 'HTML5 and CSS3 Bootcamp',
    eventDate: 1536966000000,
    guests: [],
    imageUrl: 'https://generalassemb.ly/blog/wp-content/uploads/2014/08/dash1.png',
    isIndoors: true,
    location: {
      streetNumber: 114,
      streetName: 'White Chapel High St',
      postcode: 'E1 7PT',
      lat: -0.072513,
      lon: 51.515379          // should seed this initially
    }
  }
];

const Event = require('../../models/event');

describe('GET /events', () => {  //testing the event index route
  //load event data before each test
  beforeEach(done => {
    Event.remove({})
      .then(() => Event.create(eventData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get('/api/events')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array of data', done => {
    api.get('/api/events')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return objects within the array', done => {
    api.get('/api/events')
      .end((err, res) => {
        res.body.forEach(event => expect(event).to.be.an('object'));
        done();
      });
  });

  it('should return an array with the correct length', done => {
    api.get('/api/events')
      .end((err, res) => {
        expect(res.body.length).to.eq(eventData.length);
        done();
      });

  });

  it('should return the correct data', done => {
    api.get('/api/events')
      .end((err, res) => {
        res.body.forEach(event => {
          //get the correct seed data to compare //filter returns an array
          const testingEvent = eventData.filter(eventTest => eventTest.eventTitle === event.eventTitle)[0];

          //expectations are
          expect(event.capacity).to.eq(testingEvent.capacity);
          expect(event.duration).to.eq(testingEvent.duration);
          expect(event.category).to.eq(testingEvent.category);
          expect(event.imageUrl).to.eq(testingEvent.imageUrl);
          expect(event.guests).to.be.an('array');

        });
        done();
      });
  });

});


//=========from WHISKEASE=========//

// res.body.forEach(whiskey =>{
//   //get the right whiskey from the whiskeyData array.
//   const dataWhiskey = whiskeyData.filter(w => w.name === whiskey.name)[0]; //[0] because filter returns an array.
//   expect(whiskey.name).to.eq(dataWhiskey.name);
//   expect(whiskey.originCountry).to.eq(dataWhiskey.originCountry);
//   expect(whiskey.imagUrl).to.eq(dataWhiskey.imagUrl);
//
//   whiskey.pricePoints.forEach((pricePoint, index) =>{
//     expect(pricePoint.retailer).to.eq(dataWhiskey.pricePoints[index].retailer);
//   });
// });
