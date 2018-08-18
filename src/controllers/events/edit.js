function EventsEditCtrl($scope, $http, $state) {
  $scope.updateEvent = function() {
    console.log('the event is -------->', $scope.event);
    $http({
      method: 'PUT',
      url: `/api/events/${$state.params.id}`,
      data: $scope.event
    })
      .then(() => $state.go('eventsShow', {id: $state.params.id}));
  };
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.id}`
  })
    .then(res => $scope.event = res.data);
}

export default EventsEditCtrl;
