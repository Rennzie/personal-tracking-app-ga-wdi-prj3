function EventsIndexCtrl($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/events'
  }) //Submit an HTTP request to /api/EventsIndexCtrl
    .then(res => {
      console.log('events are', res.data);
      $scope.events = res.data;
    });
}

export default EventsIndexCtrl;
