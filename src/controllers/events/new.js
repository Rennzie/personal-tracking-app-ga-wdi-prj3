function EventsNewCtrl($scope, $http, $state) {
  $scope.createEvent = function() {
    console.log('creating an event', $scope.event);
    $http({
      method: 'POST',
      url: '/api/events',
      data: $scope.event
    })
      .then(() => $state.go('eventsIndex'));
  };
}

export default EventsNewCtrl;
