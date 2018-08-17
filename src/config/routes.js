// FRONT END ROUTER

function Router($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('about', {
      templateUrl: './views/about.html',
      url: '/about'
    })
    .state('home', {
      templateUrl: './views/home.html',
      url: '/'
    })

    //--------EVENTS STATES ----------//
    .state('eventsIndex', {
      templateUrl: './views/events/index.html',
      url: '/events',
      controller: 'EventsIndexCtrl'
    })
    .state('eventsShow', {
      templateUrl: './views/events/show.html',
      url: '/events/:id', //id is now a parameter of the state
      controller: 'EventsShowCtrl'
    })
    .state('eventsNew', {
      templateUrl: './views/events/new.html',
      url: '/events/new',
      controller: 'EventsNewCtrl'
    })
    .state('eventsEdit', {
      templateUrl: './views/events/edit.html',
      url: '/events/:id/edit',
      controller: 'EventsEditCtrl'
    });

    //-------- AUTH STATES ---------//
    // .state('login', {
    //   templateUrl: './views/auth/login.html',
    //   url: '/login',
    //   controller: 'AuthLoginCtrl'
    // })
    // .state('register', {
    //   templateUrl: './views/auth/register.html',
    //   url: '/register',
    //   controller: 'AuthRegisterCtrl'
    // })

    //--------- USER STATES ---------//
    // .state('usersEdit', {
    //   templateUrl: '.views/users/edit.html',
    //   url: '/users/:id/edit',
    //   controller: 'usersEditCtrl'
    // })
    // .state('usersShow', {
    //   templateUrl: './views/users/show.html',
    //   url: '/users/:id', //id is now a parameter of the state
    //   controller: 'EventsShowCtrl'
    // });

  $urlRouterProvider.otherwise('/');
}

export default Router;
