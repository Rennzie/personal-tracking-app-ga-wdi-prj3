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
    imageUrl: 'https://i.imgur.com/7w0bach.gif',
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
    postcodeHome: 'W1D 4AD',
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
    category: 'Body',
    capacity: 3,
    concluded: false,
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
    concluded: false,
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
    concluded: true,
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
  }, {
    category: 'Body',
    capacity: 30,
    concluded: false,
    durationHrs: 1,
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
    category: 'Body',
    capacity: 25,
    concluded: false,
    durationMin: 30,
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
  }, {
    category: 'Body',
    capacity: 15,
    concluded: true,
    durationHrs: 1,
    description: 'Cycle blends high-octane power and pace, for a full body workout. Lose yourself as you push through the climb, saddle up in the sprint and move to the beat of expertly curated playlists. Take it to the next level with in-class challenges, live metrics and individual performance tracking tools. Dig deep. Embrace that post-class high. You can bring your own cleats (Shimano spd mtb) or rent shoes from us. Otherwise your normal trainers will work.',
    eventTitle: 'Cycle',
    eventDateTime: 'Tuesday August 21 2018 06:00:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://www.abouttimemagazine.co.uk/wp-content/uploads/2016/07/CoreCollective2.jpg',
    isIndoors: true,
    location: {
      streetNumber: 45,
      streetName: 'Philimore Walk',
      postcode: 'W8 7RZ'
    }
  },{
    category: 'Soul',
    capacity: 8,
    concluded: true,
    durationHrs: 2,
    description: 'Meditation is the process of turning your attention inward with one-pointed focus, bringing about a sense of peace and self-acceptance. The meditation and mindfulness teachers at triyoga will have a range of influences from Buddhist to non-secular, and they will each possess their own approach to teaching this class. Open to all levels, from complete beginners to more experienced students.',
    eventTitle: 'Meditation + Mindfulness',
    eventDateTime: 'Saturday June 30 2018 11:00:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://static1.squarespace.com/static/56576768e4b0c6e18e346bea/574b245bf699bbded7dcb642/574b24da27d4bdfe229ab693/1464542842272/sink+plants.jpg?format=2500w',
    isIndoors: true,
    location: {
      streetNumber: 372,
      streetName: 'Kings Road',
      postcode: 'sw3 5uz'
    }
  },{
    category: 'Soul',
    capacity: 14,
    concluded: false,
    durationHrs: 6,
    description: 'There is an ever-growing body of empirical evidence showing that mindfulness can help us self-regulate our moods and thoughts, become more resilient in the face of stress and challenges, make us more productive and effective, and restore a sense of calm and balance to our lives.This workshop will help you understand how these changes come about and how you can incorporate a mindfulness practice in your own life. It’s also an opportunity to relax and reconnect in a beautiful space overlooking Fitzroy Square (near Warren Street).' ,
    eventTitle: 'Introduction to Mindfulness',
    eventDateTime: 'Monday September 10 2018 11:00:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://www.mindful.org/wp-content/uploads/Calm.jpg',
    isIndoors: true,
    location: {
      streetNumber: 6,
      streetName: 'Fitzroy Square',
      postcode: 'w1t 5dx'
    }
  },{
    category: 'Soul',
    capacity: 12,
    concluded: true,
    durationHrs: 4,
    description: 'Learn to cook with chef, Kimberly Parsons, founder of the Retreat Cafes and author of the Yoga Kitchen, offers meal solutions to align your physical and mental energy, and boost your overall happiness. With recipes ranging from Dukkah eggs with broad bean & avocado mash, One pot masala dhal, Soba noodle buddha bowl to Raw caramel slice with bee pollen, it has never been simpler to bring healthy, nutritious and balanced dishes directly into your kitchen.' ,
    eventTitle: 'Yoga Kitchen Cookery School',
    eventDateTime: 'Wednesday July 11 2018 11:00:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://static.standard.co.uk/s3fs-public/thumbnails/image/2017/03/20/11/mindfulcooking.jpg?w968',
    isIndoors: true,
    location: {
      streetNumber: 64,
      streetName: 'Eaton Terrace',
      postcode: 'SW1W 8TZ'
    }
  },{
    category: 'Soul',
    capacity: 15,
    concluded: false,
    durationHrs: 6,
    description: 'First get your muscles and joints limbered up with some gentle and relaxing Dru Yoga, before working with a partner to receive (and learn!) a glorious introduction to Thai Yoga Massage. Thai Yoga Massage is a clever combination of targeted acupressure and applied Hatha Yoga stretches. It is administered fully clothed and in this workshop you will receive, and learn how to give, a simple massage to a friend or partner. Dru Yoga is a beautiful slow and flowing form of yoga that will help you to relax, unwind and stretch out your body. It can help revive tired muscles, reduce back pain and combat stress. Dru Yoga gives the mind and body much needed rest and relaxation, to help you find a still point in a busy world?' ,
    eventTitle: 'Dru Yoga and Thai Yoga Massage',
    eventDateTime: 'Friday September 28 2018 10:00:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://static1.squarespace.com/static/56576768e4b0c6e18e346bea/574b245bf699bbded7dcb642/574b24c027d4bdfe229ab5f3/1464542402458/cactus.jpg?format=2500w',
    isIndoors: true,
    location: {
      streetNumber: 95,
      streetName: 'Rye Lane',
      postcode: 'SE15 5BU'
    }
  },{
    category: 'Mind',
    capacity: 25,
    concluded: true,
    durationHrs: 8,
    description: 'This one day life drawing taster is for anyone considering applying for Art and Design courses. Life drawing is an essential part of any portfolio application, and this one day workshop will teach you expressive drawing in a unique way to bring your drawing on most effectively.' ,
    eventTitle: 'Lifedrawing Workshop',
    eventDateTime: 'Monday July 2 2018 10:00:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'http://hoxtonradio.com/wp-content/uploads/2017/10/YOKE.jpg',
    isIndoors: true,
    location: {
      streetNumber: 3,
      streetName: 'Stamford Works',
      postcode: 'N16 8JH'
    }
  },{
    category: 'Mind',
    capacity: 8,
    concluded: false,
    durationHrs: 2,
    description: 'Jess works on organic light emitting diodes that emit circularly polarised light. To achieve this, she creates chiral nanostructures out of carbon-based materials. Jess believes that when it comes to nanoscale molecular engineering; nature is the expert and we humans are only just catching up. Our world and our bodies are full of “chiral” systems – non-superimposable mirror images, like your left and right hand, DNA, or the stacks of fibrous chitin in the shell of a beetle. Understanding how to create and control left and right-handed systems will transform drug discovery, cryptography, the diagnosis of diseases and even our televisions.' ,
    eventTitle: 'How science got women wrong',
    eventDateTime: 'Thursday August 30 2018 20:00:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://i.imgur.com/TaT6k3z.jpg',
    isIndoors: true,
    location: {
      streetNumber: 11,
      streetName: 'Rathbone Place',
      postcode: 'W1T 1JN'
    }
  },{
    category: 'Mind',
    capacity: 200,
    concluded: true,
    durationHrs: 2,
    description: 'Oliver Bullough is a prize-winning journalist and author from Wales, who specialises in the former Soviet Union and corruption. His work appears in the Guardian, the New York Times, GQ magazine, Prospect and elsewhere, and he regularly appears on the BBC, Sky News, CNN and other media outlets. His latest book is Moneyland, about which John le Carré said: "If you want to know why international crooks and their eminently respectable financial advisors walk tall and only the little people pay taxes, this is the ideal book for you".' ,
    eventTitle: 'Dark Data, Dark Money & Putins Russia',
    eventDateTime: 'Tuesday September 25 2018 19:00:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://i.imgur.com/XP5QLYP.jpg',
    isIndoors: true,
    location: {
      streetNumber: 14,
      streetName: 'Marsham Street',
      postcode: 'SW1P 4DF'
    }
  },{
    category: 'MIND',
    capacity: 200,
    concluded: false,
    durationHrs: 2,
    description: 'What is the point to attend to a cookery class just to follow a recipe? Hosted by David, the founder of Pencil & Fork Ltd ("Learning experiences through food"). Blend physics and chemistry to transform the taste and texture of food and learn the tricks of molecular gastronomy.',
    eventTitle: 'Molecular Gastronomy Techniques',
    eventDateTime: 'Thursday September 27 2018 20:00:00 GMT+0100 (British Summer Time)',
    guests: [],
    imageUrl: 'https://eattreat.in/wp-content/uploads/2016/11/0c2246d1aaf2702e35aa39230f151a59-768x460.jpg',
    isIndoors: true,
    location: {
      streetNumber: 12,
      streetName: 'Foley Street',
      postcode: 'W1W 6DP'
    }
  }
];


// data created, ready to start seeding
User
  .create(userData)
  .then(users => {
    console.log(`Created ${users.length} users`);
    //add a user id to Event created by
    eventData.forEach(event => {
      const randomIndex = Math.floor(Math.random() * users.length);
      event.createdBy = users[randomIndex].id;
    });



    // push many users into the attending event array
    eventData.forEach(event => {
      users.forEach(user => {
        if(event.capacity > event.guests.length){
          event.guests.push(user.id);
        }
      });
    });


    // NEED TO ADD A HOSTER
    // data populated with user id's, return to chain another .then()
    return Event.create(eventData);
  })
  .then(events => {
    //events created in DB, log them
    console.log(`Create ${events.length} events`);

    //create goals and return them so we can log them
    // return Goal.create(goalData);
  })
  // .then(goals => console.log(`Create ${goals.length} goals`))
  .catch(err => console.log('Seeding error is', err))
  .finally(() => mongoose.connection.close());
