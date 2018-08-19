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
    const updateData = $scope.event;
    updateData.guests.push($scope.getPayload().sub);

    $http({ // NOTE: this does not repopulate the guest array in backend
      method: 'PUT',
      url: `/api/events/${$state.params.id}`,
      data: JSON.stringify(updateData)
    }).then(result => {
      console.log('The updated data is: ', result.data);
    });
  };
}

export default EventsShowCtrl;







//  PSUEDO CODE FOR UPDATING ATTENDEE LIST
//make a put request to event update
//send an update guest array
//  --> this should include all required fields
