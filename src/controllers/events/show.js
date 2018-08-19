function EventsShowCtrl($http, $state, $scope) {
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.id}`
  })
    .then(res => {
      console.log('Found an event', res.data);
      $scope.event = res.data;
    });

  $scope.attend = function(){
  //make a put request to event update
  //send an update guest array
  //  --> this should include all required fields

    const updateData = $scope.event;
    updateData.guests.push($scope.getPayload().sub);

    console.log('the updated data is: ', updateData);
    $http({
      method: 'PUT',
      url: `/api/events/${$state.params.id}`,
      data: JSON.stringify(updateData)
    });
  };
}

export default EventsShowCtrl;
