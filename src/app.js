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

//-------- ANGULAR MODULE -----------//

angular.module('Resolut', [
  'ui.router', 'satellizer', 'ngMessages'
])
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .config(Router);
