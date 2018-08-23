function EventsIndexCtrl($scope, $http, $state) {
  $http({
    method: 'GET',
    url: '/api/events'
  }) //Submit an HTTP request to /api/EventsIndexCtrl
    .then(res => {
      const upcomingEvents = res.data.filter(event => event.concluded === false);
      let events;
      switch($state.current.name){
        case 'eventsIndex':
          events = upcomingEvents;
          break;
        case 'eventsMindIndex':
          events = upcomingEvents.filter(event => event.category === 'Mind');
          break;
        case 'eventsBodyIndex':
          events = upcomingEvents.filter(event => event.category === 'Body');
          break;
        case 'eventsSoulIndex':
          events = upcomingEvents.filter(event => event.category === 'Soul');
          break;
      }

      $scope.events = events;
    });
}

export default EventsIndexCtrl;
