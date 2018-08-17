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

//-------- ANGULAR MODULE -----------//

angular.module('Resolut', [
  'ui.router', 'satellizer', 'ngMessages'
])
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .config(Router);
