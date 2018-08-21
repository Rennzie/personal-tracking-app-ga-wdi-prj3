const mongoose = require('mongoose');
// User bluebird to make promises easier
mongoose.Promise = require('bluebird');

// connect to Mongo using our dbURI
const { dbURI } = require('../config/environment');

// Import all the models
const User = require('../models/user');
const Event = require('../models/event');
const Goal = require('../models/goal');

mongoose.connect(dbURI);

// Clear out the collections before we add data again
User.collection.drop();
Event.collection.drop();
Goal.collection.drop();

// All our seed data in arrays
const userData = [
  {
    email: 'rnnsea001@gmail.com',
    firstName: 'Sean',
    postcodeHome: 'sw62tg',
    isHost: false,
    imageUrl: 'https://media.licdn.com/dms/image/C4D03AQE0THE9Yt64RQ/profile-displayphoto-shrink_800_800/0?e=1540425600&v=beta&t=9jeA_gghW14t7gF79DLJdgRKiT5-WjF1WNrgXFODIo0',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Rennie',
    username: 'Rennzie',
    isAdmin: true
  },{
    email: 'mooapples@gmail.com',
    firstName: 'Kristi',
    postcodeHome: 'sw62tg',
    isHost: true,
    imageUrl: 'https://media.licdn.com/dms/image/C4E03AQFofAOKMtZKVQ/profile-displayphoto-shrink_800_800/0?e=1540425600&v=beta&t=a7kDLU4yCht4TFk7mkx4z3kadt6gpLCywqPqulJRVN8',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Sayer',
    username: 'MooApples'
  },{
    email: 'sophie.cornish@gmail.com',
    firstName: 'Sophie',
    postcodeHome: 'W8 4lf',
    isHost: true,
    imageUrl: 'https://media.licdn.com/dms/image/C4D03AQFaTtcqjpz0Hg/profile-displayphoto-shrink_200_200/0?e=1540425600&v=beta&t=XvcqY7U8E-QweIvqeX2bWeT28XhVZ_ja4DsW0OM1p-Y',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Cornish',
    username: 'Scornish',
    isAdmin: true
  },{
    email: 'trimhall@gmail.com',
    firstName: 'Tristan',
    postcodeHome: 'cr0 1fn',
    isHost: false,
    imageUrl: 'https://media.licdn.com/dms/image/C5603AQEprR3HW3VtTg/profile-displayphoto-shrink_800_800/0?e=1540425600&v=beta&t=p2kRISKnwKXVHAeM1XEn583SgYOzUIiVqbZ8Yxgc2qY',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Hall',
    username: 'TrimHall'
  },{
    email: 'joecarnell@gmail.com',
    firstName: 'Joe',
    postcodeHome: 'sw6 2rh',
    isHost: true,
    imageUrl: 'https://media.licdn.com/dms/image/C5603AQHSH8eI4d3cxw/profile-displayphoto-shrink_800_800/0?e=1540425600&v=beta&t=JtYN93OlTP1vL-d2nWYL91jbtR02pGr4LCocyMbGRC8',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Carnell',
    username: 'j_c_93'
  }
  ,{
    email: 'sa.lane@hotmail.com',
    firstName: 'Sophie',
    postcodeHome: 'W8 4RZ',
    isHost: false,
    imageUrl: 'https://media.licdn.com/dms/image/C4E03AQGqlkCMeVLGag/profile-displayphoto-shrink_800_800/0?e=1540425600&v=beta&t=vlhFn3DEZfs5L9dfN-3Vr5EnOx3csRgR80AlkyyDkiI',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Lane',
    username: 'slane08'
  },
  {
    email: 'laura_mee@gmail.com',
    firstName: 'Laura',
    postcodeHome: 'SW11 4RF',
    isHost: false,
    imageUrl: 'https://media.licdn.com/dms/image/C4E03AQEd60JLN2UpLw/profile-displayphoto-shrink_800_800/0?e=1540425600&v=beta&t=YonhZcHvx8ISHx3EkMaFojKnMPgkFXJ7DlR5qNaHW_w',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Mee',
    username: 'laura_diana'
  },
  {
    email: 'bevanvb@hotmail.com',
    firstName: 'Victoria',
    postcodeHome: 'EC1V 4PA',
    isHost: true,
    imageUrl: 'https://media.licdn.com/dms/image/C4E03AQGcDF_pKRvnEw/profile-displayphoto-shrink_800_800/0?e=1540425600&v=beta&t=B5cv3afhbZsShT1ymH1mANGNjxM-GTGLZPxklopzrB0',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Bevan',
    username: 'victoriaB'
  },
  {
    email: 'roblevy@gmail.com',
    firstName: 'Rob',
    postcodeHome: 'E11 4TT',
    isHost: true,
    imageUrl: 'https://media.licdn.com/dms/image/C4D03AQG-0jJSbuyp3w/profile-displayphoto-shrink_800_800/0?e=1540425600&v=beta&t=KSFsrhhg7xV7tBnJYheWIdEbcJdXrvvxfSMFd1C0v-A',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Levy',
    username: 'rlevy22'
  }
  ,{
    email: 'alexrook_07@gmail.com',
    firstName: 'Alex',
    postcodeHome: 'W2 5JW',
    isHost: false,
    imageUrl: 'https://media.licdn.com/dms/image/C5603AQFR9IJPWExLrQ/profile-displayphoto-shrink_800_800/0?e=1540425600&v=beta&t=DluHjbE0f87z_AMyGi2lC-C-eHDznHEIvV4y-HlsBmc',
    password: 'pass',
    passwordConfirmation: 'pass',
    surname: 'Rook',
    username: 'rookie93'
  }
];

const eventData = [
  {                   //Calisthenics in the park
    category: 'body',
    capacity: 3,
    concluded: false,
    duration: 1,
    description: 'Small group Calisthenics training focussed on intermediate athletes looking to get better at handstands and muscle ups',
    eventTitle: 'Calisthenics in the Park',
    eventDateTime: 'Thu Oct 11 2018 22:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'http://www.bjj-usa.com/wp-content/uploads/2017/08/calisthenics-benefits-6.jpg',
    isIndoors: false,
    location: {     //sub document to hold event location
      streetNumber: 9,
      streetName: 'Greensward',
      postcode: 'sw62tg'
    }
  }, {
    category: 'soul',
    capacity: 5,
    concluded: false,
    duration: 2,
    description: 'Home hosted hatha yoga training',
    eventTitle: 'Hatha at Home',
    eventDateTime: 'Thu Oct 11 2018 22:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'http://s3.amazonaws.com/images-s3.yogainternational.com/assets/content/articles/How_To_Get_Better_at_Yoga.jpg',
    isIndoors: true,
    location: {     //sub document to hold event location
      streetNumber: 9,
      streetName: 'Greensward',
      postcode: 'sw62tg'
    }
  }, {
    category: 'mind',
    capacity: 30,
    concluded: true,
    duration: 1.5,
    description: 'Start your coding journey by kick starting your skill set with HTML5 and CSS basics. This General Assembly short course will give you a taste for what front end develoers could be tackling on a daily basis',
    eventTitle: 'HTML5 and CSS3 Bootcamp',
    eventDateTime: 'Thu Oct 11 2018 22:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://generalassemb.ly/blog/wp-content/uploads/2014/08/dash1.png',
    isIndoors: true,
    location: {
      streetNumber: 114,
      streetName: 'White Chapel High St',
      postcode: 'E1 7PT'
    }
  }, {
    category: 'body',
    capacity: 20,
    concluded: true,
    duration: 1.5,
    description: '45 minutes of physical and mental intensity. Exertion that you never thought possible. This highly intensive group experience is designed to condition and resculpt selected muscle-groups. The latest Woodway 4Front treadmills and the bespoke and patented 1R workout platform will help mould your body and break your barriers.',
    eventTitle: 'Reshape',
    eventDateTime: 'Wed April 11 2018 10:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://detoxandretox.files.wordpress.com/2016/05/img_5502.jpg?w=620&h=465',
    isIndoors: true,
    location: {
      streetNumber: 62,
      streetName: 'Porchester Rd',
      postcode: 'W2 6ES'
    }
  }, {
    category: 'body',
    capacity: 30,
    concluded: false,
    duration: 1,
    description: 'This is the room where everything becomes possible. Where you push through the “I cant’s” and “If Onlys.”Where you run faster, lift more, lean out, quiet down. This is what transformation looks like. Where you become the best version of yourself. The workout itself is designed for efficiency. The intervals and strength training combinations are proven to lean and tone your body. This is not a fitness trend. It’s just science. And it works. Then there is the thing that happens when the doors close, lights dim, and music turns up. There’s a palpable energy in the room that pushes you one step further. It is the soul, body, brain revolution that is uniquely Barrys.',
    eventTitle: 'Barrys Bootcamp',
    eventDateTime: 'Thu September 27 2018 06:30:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://o.aolcdn.com/images/dims?quality=80&thumbnail=1200%2C630&image_uri=https%3A%2F%2Fs-i.huffpost.com%2Fgen%2F1206602%2Fimages%2Fo-BARRYS-BOOTCAMP-facebook.jpg&client=cbc79c14efcebee57402&signature=dfa174aef2e231d89a76b0024b53c3c213543493',
    isIndoors: true,
    location: {
      streetNumber: 16,
      streetName: 'Eccleston Yards',
      postcode: 'SW1W 9NF'
    }
  }, {
    category: 'body',
    capacity: 25,
    concluded: false,
    duration: 0.5,
    description: 'Fast and furious, build with the beat. Toning strength exercises with high-energy punchbag work, firing your metabolism to burn extra calories for hours.',
    eventTitle: 'Another Space - HIIT',
    eventDateTime: 'Fri October 26 2018 18:45:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://lwithl.files.wordpress.com/2016/08/img_3449.jpg?w=940',
    isIndoors: true,
    location: {
      streetNumber: 4,
      streetName: 'Tower Street',
      postcode: 'WC2H 9NP'
    }
  }
];

const goalData = [
  {
    month: 'August', //if we user the current month then timestamps takes care of this
    mindTarget: 100,
    bodyTarget: 20,
    soulTarget: 10
  },{
    month: 'August', //if we user the current month then timestamps takes care of this
    mindTarget: 10,
    bodyTarget: 200,
    soulTarget: 50,
    bodyCompleted: 100
  },{
    month: 'August', //if we user the current month then timestamps takes care of this
    mindTarget: 54,
    bodyTarget: 30,
    soulTarget: 26,
    mindCompleted: 100
  }
];


// data created, ready to start seeding
User
  .create(userData)
  .then(users => {
    console.log(`Created ${users.length} users`);
    //add a user id to Event created by
    eventData[0].createdBy = users[0].id;
    eventData[1].createdBy = users[1].id;
    eventData[2].createdBy = users[2].id;

    // push many users into the attending event array
    users.forEach(user => eventData[0].guests.push(user.id));
    users.forEach(user => eventData[1].guests.push(user.id));
    users.forEach(user => eventData[2].guests.push(user.id));

    //add a user to each of the created goals
    goalData[0].createdBy = users[0].id;
    goalData[1].createdBy = users[1].id;
    goalData[2].createdBy = users[2].id;

    // data populated with user id's, return to chain another .then()
    return Event.create(eventData);
  })
  .then(events => {
    //events created in DB, log them
    console.log(`Create ${events.length} events`);

    //create goals and return them so we can log them
    return Goal.create(goalData);
  })
  .then(goals => console.log(`Create ${goals.length} goals`))
  .catch(err => console.log('Seeding error is', err))
  .finally(() => mongoose.connection.close());
