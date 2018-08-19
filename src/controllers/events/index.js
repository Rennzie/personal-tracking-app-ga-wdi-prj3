function EventsIndexCtrl($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/events'
  }) //Submit an HTTP request to /api/EventsIndexCtrl
    .then(res => {
      console.log('events are', res.data);
      $scope.events = res.data;

      ////----filter by catergory-----////
      $scope.mindEvents = res.data.filter(event => event.category === 'mind');
      $scope.soulEvents = res.data.filter(event => event.category === 'soul');
      $scope.bodyEvents = res.data.filter(event => event.category === 'body');
      // console.log('the mind events are ', $scope.mindEvents);
    });
}

export default EventsIndexCtrl;
