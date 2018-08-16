const mongoose = require('mongoose');
const {DB_URI } = require('../config/environments');
mongoose.Promise = require('bluebird');
mongoose.connect(DB_URI);

const User = require('../models/user');
const GeoSite = require('../models/geoSite');

User.collection.drop();
GeoSite.collection.drop();

User
  .create([
    {
      profilePic: 'https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-1/p320x320/34581767_10155299347870957_9209563081342976000_n.jpg?_nc_cat=0&oh=6c80ff9403974852fae22669c44c8298&oe=5BD6E5A5',
      firstName: 'Kristi',
      surname: 'Sayer',
      userName: 'Alice18',
      email: 'alice18@gmail.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isGeologist: false
    },{
      profilePic: 'https://avatars0.githubusercontent.com/u/32762874?s=460&v=4',
      firstName: 'Sean',
      surname: 'Rennie',
      userName: 'Rennzie',
      email: 'rnnsea001@gmail.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isGeologist: true
    },{
      profilePic: 'https://avatars0.githubusercontent.com/u/38442214?s=460&v=4',
      firstName: 'Tristan',
      surname: 'Hall',
      userName: 'TrimHall',
      email: 'trimhall@gmail.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isGeologist: false
    },{
      profilePic: 'https://avatars2.githubusercontent.com/u/4764631?s=460&v=4',
      firstName: 'Rob',
      surname: 'Levy',
      userName: 'LondonRob',
      email: 'londonrob@gmail.com',
      password: 'pass',
      passwordConfirmation: 'pass'
    }
  ])
  .then(users => {
    // users now has DB IDs!
    console.log(`Created ${users.length}`);
    GeoSite
      .create([
        {
          coverPic: 'https://www.ramblersholidays.co.uk/Images/HolidayHeros/75207_cehhero.jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          name: 'Giants Causeway',
          country: 'Ireland',
          images: ['https://images.pexels.com/photos/415976/pexels-photo-415976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350','https://images.pexels.com/photos/1187846/pexels-photo-1187846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', 'https://images.pexels.com/photos/63553/pexels-photo-63553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/414116/pexels-photo-414116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',   'https://lonelyplanetimages.imgix.net/mastheads/519345837_super.jpg?sharp=10&vib=20&w=1200', 'https://cdn.britannica.com/700x450/93/177993-004-955E8B7F.jpg', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/27/14/giants-causeway.jpg', 'https://aerosoft-shop.com/shop-rd/bilder/screenshots/fsx/ayersrock/ayers-rock%20(1).jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyEOEuiUa_NEe1CltM45ZysS6-P_LLKbYUIWw7IzMQbiPbaazv7Q',   'http://all-geo.org/highlyallochthonous/wp-content/uploads/2010/07/Barberton-pillows.jpg', 'https://blogs.agu.org/mountainbeltway/files/2017/02/IMG_5279.jpg'],
          period: 'Pre-cambrian',
          age: 6000000,
          region: 'North',
          rockTypes: ['sandstone', 'basalt', 'metamorphic', 'mylonite', 'igneous', 'pyrite', 'shale', 'schist', 'greenstone', 'porphyry'],
          createdBy: users[1].id,
          reviews: [{
            reviewedBy: users[0].id,
            rating: 4,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[1].id,
            rating: 1,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[3].id,
            rating: 5,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[0].id,
            rating: 3,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          }],
          lat: 55.2408,
          long: -6.511,
          mapLink: 'https://www.google.co.uk/maps/place/Giant\'s+Causeway/@55.2406415,-6.5162615,16z/data=!3m1!4b1!4m5!3m4!1s0x0:0xf3228ca019de1fd2!8m2!3d55.2408073!4d-6.5115554'
        },{
          coverPic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/DenglerSW-Stromboli-20040928-1230x800.jpg/1200px-DenglerSW-Stromboli-20040928-1230x800.jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
          name: 'Stromboli ',
          images: ['https://images.pexels.com/photos/415976/pexels-photo-415976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350','https://images.pexels.com/photos/1187846/pexels-photo-1187846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', 'https://images.pexels.com/photos/63553/pexels-photo-63553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/414116/pexels-photo-414116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',   'https://lonelyplanetimages.imgix.net/mastheads/519345837_super.jpg?sharp=10&vib=20&w=1200', 'https://cdn.britannica.com/700x450/93/177993-004-955E8B7F.jpg', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/27/14/giants-causeway.jpg', 'https://aerosoft-shop.com/shop-rd/bilder/screenshots/fsx/ayersrock/ayers-rock%20(1).jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyEOEuiUa_NEe1CltM45ZysS6-P_LLKbYUIWw7IzMQbiPbaazv7Q',   'http://all-geo.org/highlyallochthonous/wp-content/uploads/2010/07/Barberton-pillows.jpg', 'https://blogs.agu.org/mountainbeltway/files/2017/02/IMG_5279.jpg'],
          age: 2000,
          period: 'Pre-cambrian',
          country: 'Italy',
          region: 'North',
          rockTypes: ['sandstone', 'basalt', 'metamorphic', 'mylonite', 'igneous', 'pyrite', 'shale', 'schist', 'greenstone', 'porphyry'],
          createdBy: users[1].id,
          reviews: [{
            reviewedBy: users[0].id,
            rating: 4,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[1].id,
            rating: 1,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[2].id,
            rating: 5,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[0].id,
            rating: 3,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          }],
          lat: 38.79,
          long: 15.214,
          mapLink: 'https://www.google.co.uk/maps/place/Stromboli/@38.7918369,15.1802725,13z/data=!3m1!4b1!4m5!3m4!1s0x1315e560df94b48f:0x8b4bca7c47c14447!8m2!3d38.7925148!4d15.214917'
        },{
          coverPic: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/35000/35970/barberton_etm_2001121.jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          name: 'Barbeton Greenstone Belt',
          images: ['https://images.pexels.com/photos/415976/pexels-photo-415976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350','https://images.pexels.com/photos/1187846/pexels-photo-1187846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', 'https://images.pexels.com/photos/63553/pexels-photo-63553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/414116/pexels-photo-414116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',   'https://lonelyplanetimages.imgix.net/mastheads/519345837_super.jpg?sharp=10&vib=20&w=1200', 'https://cdn.britannica.com/700x450/93/177993-004-955E8B7F.jpg', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/27/14/giants-causeway.jpg', 'https://aerosoft-shop.com/shop-rd/bilder/screenshots/fsx/ayersrock/ayers-rock%20(1).jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyEOEuiUa_NEe1CltM45ZysS6-P_LLKbYUIWw7IzMQbiPbaazv7Q',   'http://all-geo.org/highlyallochthonous/wp-content/uploads/2010/07/Barberton-pillows.jpg', 'https://blogs.agu.org/mountainbeltway/files/2017/02/IMG_5279.jpg'],
          age: 3200000000,
          period: 'Pre-cambrian',
          country: 'South Africa',
          region: 'North',
          rockTypes: ['sandstone', 'basalt', 'metamorphic', 'mylonite', 'igneous', 'pyrite', 'shale', 'schist', 'greenstone', 'porphyry'],
          createdBy: users[1].id,
          reviews: [{
            reviewedBy: users[0].id,
            rating: 4,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[1].id,
            rating: 1,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[2].id,
            rating: 5,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[3].id,
            rating: 3,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          }],
          lat: -25.7752,
          long: 31.04,
          mapLink: 'https://www.google.co.uk/maps/place/Barberton,+South+Africa/@-25.7750372,31.0069429,13z/data=!3m1!4b1!4m5!3m4!1s0x1ee8f8741a98c6c5:0x5075e6ff53193066!8m2!3d-25.7752265!4d31.0449768'
        },{
          coverPic: 'https://thumbs.dreamstime.com/b/majestic-rocky-redish-mountains-seweweekspoort-pass-south-africa-53842233.jpg',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          name: 'Seweweekspoortpas',
          images: ['https://images.pexels.com/photos/415976/pexels-photo-415976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350','https://images.pexels.com/photos/1187846/pexels-photo-1187846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', 'https://images.pexels.com/photos/63553/pexels-photo-63553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/414116/pexels-photo-414116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',   'https://lonelyplanetimages.imgix.net/mastheads/519345837_super.jpg?sharp=10&vib=20&w=1200', 'https://cdn.britannica.com/700x450/93/177993-004-955E8B7F.jpg', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/27/14/giants-causeway.jpg', 'https://aerosoft-shop.com/shop-rd/bilder/screenshots/fsx/ayersrock/ayers-rock%20(1).jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyEOEuiUa_NEe1CltM45ZysS6-P_LLKbYUIWw7IzMQbiPbaazv7Q',   'http://all-geo.org/highlyallochthonous/wp-content/uploads/2010/07/Barberton-pillows.jpg', 'https://blogs.agu.org/mountainbeltway/files/2017/02/IMG_5279.jpg'],
          age: 400000000,
          period: 'Pre-cambrian',
          country: 'South Africa',
          region: 'North',
          rockTypes: ['sandstone', 'basalt', 'metamorphic', 'mylonite', 'igneous', 'pyrite', 'shale', 'schist', 'greenstone', 'porphyry'],
          createdBy: users[1].id,
          reviews: [{
            reviewedBy: users[0].id,
            rating: 4,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[1].id,
            rating: 1,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[2].id,
            rating: 5,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[0].id,
            rating: 3,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          }],
          lat: -33.34,
          long: 21.4,
          mapLink: 'https://www.google.co.uk/maps/search/Seweweekspoort+Pass+age/@-33.3999983,21.3824904,14z/data=!3m1!4b1'
        },{
          coverPic: 'http://d3ne5s9fv9p81l.cloudfront.net/bf/32/40d/7d3/ab51012fb70754dab039c8.jpg?imageView2/2/format/jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          name: 'Grand Canyon',
          images: ['https://images.pexels.com/photos/415976/pexels-photo-415976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350','https://images.pexels.com/photos/1187846/pexels-photo-1187846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', 'https://images.pexels.com/photos/63553/pexels-photo-63553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/414116/pexels-photo-414116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',   'https://lonelyplanetimages.imgix.net/mastheads/519345837_super.jpg?sharp=10&vib=20&w=1200', 'https://cdn.britannica.com/700x450/93/177993-004-955E8B7F.jpg', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/27/14/giants-causeway.jpg', 'https://aerosoft-shop.com/shop-rd/bilder/screenshots/fsx/ayersrock/ayers-rock%20(1).jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyEOEuiUa_NEe1CltM45ZysS6-P_LLKbYUIWw7IzMQbiPbaazv7Q',   'http://all-geo.org/highlyallochthonous/wp-content/uploads/2010/07/Barberton-pillows.jpg', 'https://blogs.agu.org/mountainbeltway/files/2017/02/IMG_5279.jpg'],
          age: 6000000,
          period: 'Pre-cambrian',
          country: 'United States of America',
          region: 'North',
          rockTypes: ['sandstone', 'basalt', 'metamorphic', 'mylonite', 'igneous', 'pyrite', 'shale', 'schist', 'greenstone', 'porphyry'],
          createdBy: users[1].id,
          reviews: [{
            reviewedBy: users[0].id,
            rating: 4,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[1].id,
            rating: 1,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[2].id,
            rating: 5,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[0].id,
            rating: 3,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          }],
          lat: 36.107,
          long: -112.113,
          mapLink: 'https://www.google.co.uk/maps/place/Grand+Canyon+National+Park/@36.0871875,-113.964307,8z/data=!3m1!4b1!4m5!3m4!1s0x873312ae759b4d15:0x1f38a9bec9912029!8m2!3d36.1069652!4d-112.1129972'
        },{
          coverPic: 'https://npca.s3.amazonaws.com/images/8730/99686cb0-381a-4232-961a-75eeb04db657-banner.jpg?1445970462',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          name: 'Yosemite National Park',
          images: ['https://images.pexels.com/photos/415976/pexels-photo-415976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350','https://images.pexels.com/photos/1187846/pexels-photo-1187846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', 'https://images.pexels.com/photos/63553/pexels-photo-63553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/414116/pexels-photo-414116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',   'https://lonelyplanetimages.imgix.net/mastheads/519345837_super.jpg?sharp=10&vib=20&w=1200', 'https://cdn.britannica.com/700x450/93/177993-004-955E8B7F.jpg', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/27/14/giants-causeway.jpg', 'https://aerosoft-shop.com/shop-rd/bilder/screenshots/fsx/ayersrock/ayers-rock%20(1).jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyEOEuiUa_NEe1CltM45ZysS6-P_LLKbYUIWw7IzMQbiPbaazv7Q',   'http://all-geo.org/highlyallochthonous/wp-content/uploads/2010/07/Barberton-pillows.jpg', 'https://blogs.agu.org/mountainbeltway/files/2017/02/IMG_5279.jpg'],
          age: 130000000,
          period: 'Pre-cambrian',
          country: 'United States of America',
          region: 'North',
          rockTypes: ['sandstone', 'basalt', 'metamorphic', 'mylonite', 'igneous', 'pyrite', 'shale', 'schist', 'greenstone', 'porphyry'],
          createdBy: users[1].id,
          reviews: [{
            reviewedBy: users[3].id,
            rating: 4,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[1].id,
            rating: 1,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[2].id,
            rating: 5,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[0].id,
            rating: 3,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          }],
          lat: 37.86,
          long: -119.53,
          mapLink: 'https://www.google.co.uk/maps/place/Yosemite+National+Park/@37.8529772,-119.831296,10z/data=!3m1!4b1!4m5!3m4!1s0x8096f09df58aecc5:0x2d249c2ced8003fe!8m2!3d37.8651011!4d-119.5383294'
        },{
          coverPic: 'https://parksaustralia.gov.au/uluru/images/home-1.jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          name: 'Ayers Rock',
          images: ['https://images.pexels.com/photos/415976/pexels-photo-415976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350','https://images.pexels.com/photos/1187846/pexels-photo-1187846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', 'https://images.pexels.com/photos/63553/pexels-photo-63553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/414116/pexels-photo-414116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',   'https://lonelyplanetimages.imgix.net/mastheads/519345837_super.jpg?sharp=10&vib=20&w=1200', 'https://cdn.britannica.com/700x450/93/177993-004-955E8B7F.jpg', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/27/14/giants-causeway.jpg', 'https://aerosoft-shop.com/shop-rd/bilder/screenshots/fsx/ayersrock/ayers-rock%20(1).jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyEOEuiUa_NEe1CltM45ZysS6-P_LLKbYUIWw7IzMQbiPbaazv7Q',   'http://all-geo.org/highlyallochthonous/wp-content/uploads/2010/07/Barberton-pillows.jpg', 'https://blogs.agu.org/mountainbeltway/files/2017/02/IMG_5279.jpg'],
          age: 900000000,
          period: 'Pre-cambrian',
          country: 'Australia',
          region: 'North',
          rockTypes: ['sandstone', 'basalt', 'metamorphic', 'mylonite', 'igneous', 'pyrite', 'shale', 'schist', 'greenstone', 'porphyry'],
          createdBy: users[1].id,
          reviews: [{
            reviewedBy: users[0].id,
            rating: 4,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[1].id,
            rating: 1,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[3].id,
            rating: 5,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          },{
            reviewedBy: users[0].id,
            rating: 3,
            content: 'This review means absolutely nothing and should be completely ignored by everyone and anyone',
            isGeo: true,
            title: '<review title goes here>'
          }],
          lat: -25.34,
          long: 131.036,
          mapLink: 'https://www.google.co.uk/maps/search/ayers+rock+geological+age/@-25.3456562,131.0196362,14z/data=!3m1!4b1'
        }
      ])
      .then(sites => console.log(`Created ${sites.length}`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close());
  })
  .catch(err => console.log(err));
