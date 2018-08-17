import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'angular-messages';
import './scss/style.scss';
import 'bulma';

//--------- ROUTERS------------//
import Router from './config/routes';


//---------- CUSTOM DIRECTIVES -----//


//--------- CONTROLLERS -----------//

import EventsIndexCtrl from './controllers/events/index';
import EventsShowCtrl from './controllers/events/show';
import EventsNewCtrl from './controllers/events/new';
import EventsEditCtrl from './controllers/events/edit';

import UsersShowCtrl from './controllers/users/show';

import AuthLoginCtrl from './controllers/auth/login';
import AuthRegisterCtrl from './controllers/auth/register';

//-------- ANGULAR MODULE -----------//

angular.module('Resolut', [
  'ui.router', 'satellizer', 'ngMessages'
])
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsEditCtrl', EventsEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .config(Router)
  .config(function($authProvider) {
    $authProvider.loginUrl = '/api/login';
    $authProvider.signupUrl = '/api/register';
  });
