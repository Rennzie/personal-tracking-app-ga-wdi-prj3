function EventsIndexCtrl($scope, $http, $state) {
  $http({
    method: 'GET',
    url: '/api/events'
  }) //Submit an HTTP request to /api/EventsIndexCtrl
    .then(res => {
      console.log('the $state is ======> ', $state.current.name);
      console.log('events are', res.data);
      let events;
      switch($state.current.name){
        case 'eventsIndex':
          events = res.data;
          break;
        case 'eventsMindIndex':
          events = res.data.filter(event => event.category === 'mind');
          break;
        case 'eventsBodyIndex':
          events = res.data.filter(event => event.category === 'body');
          break;
        case 'eventsSoulIndex':
          events = res.data.filter(event => event.category === 'soul');
          break;
      }

      $scope.events = events;
    });
}

export default EventsIndexCtrl;
