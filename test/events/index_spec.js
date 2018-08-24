/* globals describe, it, api, expect, beforeEach */

const eventData = [
  {                   //Calisthenics in the park
    category: 'Body',
    capacity: 3,
    durationHrs: 1,
    description: 'Small group Calisthenics training focussed on intermediate athletes looking to get better at handstands and muscle ups',
    eventTitle: 'Calisthenics in the Park',
    eventDateTime: 'Thu Oct 11 2018 22:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://athleticmuscle-aoukphiqubz0bq.netdna-ssl.com/wp-content/uploads/2018/01/Calisthenics-759x500.jpg',
    isIndoors: false,
    location: {     //sub document to hold event location
      streetNumber: 9,
      streetName: 'Greensward',
      postcode: 'sw62tg'
    }
  }, {
    category: 'Soul',
    capacity: 5,
    durationHrs: 2,
    description: 'Home hosted hatha yoga training',
    eventTitle: 'Hatha at Home',
    eventDateTime: 'Thu Oct 11 2018 22:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://static1.squarespace.com/static/56576768e4b0c6e18e346bea/574b245bf699bbded7dcb642/574b24cfe32140af98e81e76/1464542417841/alan+grasshoppe.jpg',
    isIndoors: true,
    location: {     //sub document to hold event location
      streetNumber: 9,
      streetName: 'Greensward',
      postcode: 'sw7 2az'
    }
  }, {
    category: 'Mind',
    capacity: 30,
    durationHrs: 1,
    durationMin: 30,
    description: 'Start your coding journey by kick starting your skill set with HTML5 and CSS basics. This General Assembly short course will give you a taste for what front end develoers could be tackling on a daily basis',
    eventTitle: 'HTML5 and CSS3 Bootcamp',
    eventDateTime: 'Thu Oct 11 2018 22:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://cdn-images-1.medium.com/max/1600/1*Ro78KFTHkKVV0uaMwOtSbw.jpeg',
    isIndoors: true,
    location: {
      streetNumber: 114,
      streetName: 'White Chapel High St',
      postcode: 'E1 7PT'
    }
  }, {
    category: 'Body',
    capacity: 20,
    concluded: true,
    durationHrs: 1,
    durationMin: 30,
    description: '45 minutes of physical and mental intensity. Exertion that you never thought possible. This highly intensive group experience is designed to condition and resculpt selected muscle-groups. The latest Woodway 4Front treadmills and the bespoke and patented 1R workout platform will help mould your body and break your barriers.',
    eventTitle: 'Reshape',
    eventDateTime: 'Wed April 11 2018 10:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://detoxandretox.files.wordpress.com/2016/05/img_5502.jpg?w=620&h=465',
    isIndoors: true,
    location: {
      streetNumber: 62,
      streetName: 'Porchester Rd',
      postcode: 'W2 6ET'
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
