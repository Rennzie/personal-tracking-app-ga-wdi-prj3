function EventsShowCtrl($http, $state, $scope) {
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.id}`
  })
    .then(res => {
      console.log('Found an event', res.data);
      $scope.event = res.data;
    });

  $scope.$watch('event', () => {
    checkCreatorIsUser();
    checkUserIsAttending();
  } );

  //check to see if the current user is the event owner
  function checkCreatorIsUser(){
    if($scope.event){
      //check user is logged in
      if(!$scope.isAuthenticated()){
        $scope.checkCreatorIsUser = false;
      }

      if(!$scope.event.createdBy._id){
        $scope.checkCreatorIsUser = false;
      }

      if($scope.getPayload().sub === $scope.event.createdBy._id){
        $scope.checkCreatorIsUser = true;
      }else{
        $scope.checkCreatorIsUser = false;
      }
    }

  }
  function checkUserIsAttending() {
    if($scope.event){
      const currentUser = $scope.getPayload().sub;
      const filteredGuests = $scope.event.guests.filter(guest => guest._id === currentUser);

      if(filteredGuests[0]){
        $scope.userIsAttending = true;
      }else {
        $scope.userIsAttending = false;
      }
    }
  }

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


//  REMOVE/DISABLE BUTTON IF USER IS ATTENDING
//  check if current users id is with the attending array
