// FRONT END ROUTER

function Router($stateProvider, $urlRouterProvider) {
  function secureState($q, $auth, $state, $rootScope) {
    return new $q((resolve) => {
      if($auth.isAuthenticated()) return resolve();
      // User not logged in
      // create a flash message!
      $rootScope.$broadcast('flashMessage', {
        type: 'warning',
        content: 'Please log in'
      });
      $state.go('login');
    });
  }

  $stateProvider
    .state('about', {
      templateUrl: './views/about.html',
      url: '/about'
    })
    .state('home', {
      templateUrl: './views/home.html',
      url: '/'
    })


    // .state('mind', {
    //   templateUrl: './views/mind.html',
    //   url: '/mind'
    // })
    // .state('body', {
    //   templateUrl: './views/body.html',
    //   url: '/body'
    // })
    // .state('soul', {
    //   templateUrl: './views/soul.html',
    //   url: '/soul'
    // })

    //--------EVENTS STATES ----------//
    .state('eventsIndex', {
      templateUrl: './views/events/index.html',
      url: '/events',
      controller: 'EventsIndexCtrl'
      // resolve: { secureState }
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
    })
    //-event mind index
    .state('eventsMindIndex', {
      templateUrl: './views/events/index.html',
      url: '/events/mind',
      controller: 'EventsIndexCtrl'
    })
    .state('eventsBodyIndex', {
      templateUrl: './views/events/index.html',
      url: '/events/mind',
      controller: 'EventsIndexCtrl'
    })
    .state('eventsSoulIndex', {
      templateUrl: './views/events/index.html',
      url: '/events/mind',
      controller: 'EventsIndexCtrl'
    })


    //-------- AUTH STATES ---------//
    .state('login', {
      templateUrl: './views/auth/login.html',
      url: '/login',
      controller: 'AuthLoginCtrl'
    })
    .state('register', {
      templateUrl: './views/auth/register.html',
      url: '/register',
      controller: 'AuthRegisterCtrl'
    })

  //--------- USER STATES ---------//
  // .state('usersEdit', {
  //   templateUrl: '.views/users/edit.html',
  //   url: '/users/:id/edit',
  //   controller: 'usersEditCtrl'
  // })
    .state('usersShow', {
      templateUrl: './views/users/show.html',
      url: '/users/:id',
      controller: 'UsersShowCtrl'
    })

  //--------- USER STATES ---------//
    .state('goalsNew', {
      templateUrl: './views/users/show.html',
      url: '/users/:id/goals',
      controller: 'GoalsNewCtrl'
    })
    .state('goalsLogHours', {
      templateUrl: './views/users/show.html',
      url: '/users/:userId/goals/:goalId/log',
      controller: 'GoalsEditCtrl'
    });


  $urlRouterProvider.otherwise('/');
}

export default Router;
