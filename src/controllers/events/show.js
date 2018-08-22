function EventsShowCtrl($http, $state, $scope) {

  $scope.deleteEvent = function() {
    $http({
      method: 'DELETE',
      url: `/api/events/${$state.params.id}`
    })
      .then(() => $state.go('eventsIndex'));
  };

  $http({
    method: 'GET',
    url: `/api/events/${$state.params.id}`
  })
    .then(res => {
      console.log('Found an event', res.data);
      $scope.event = res.data;
    });

  //wait for event to update before running function
  $scope.$watch('event', () => {
    checkCreatorIsUser();
    checkUserIsAttending();
    getForecast();
    getCityMapperTime();
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

  //check to see if the current user is attending the event
  function checkUserIsAttending() {
    if($scope.event){
      const currentUser = $scope.getPayload().sub;
      //filter agains current user, if length > 0 then user is attending
      const filteredGuests = $scope.event.guests.filter(guest => guest._id === currentUser);

      if(filteredGuests[0]){
        $scope.userIsAttending = true;
      }else {
        $scope.userIsAttending = false;
      }
    }
  }

  //handle user wanting to attend an event
  $scope.attend = function(){
    const data = {};
    data.id = $scope.getPayload().sub;
    $http({ // NOTE: this does not repopulate the guest array in backend dynamically
      method: 'POST',
      url: `/api/events/${$state.params.id}/guests`,
      data: JSON.stringify(data)
    }).then(result => {
      console.log('The updated data is: ', result.data);
      $scope.event = result.data;
    });
  };

  //handle users wanting to cancel sign up
  $scope.cancelAttend = function(){
    const guestId = $scope.getPayload().sub;
    //we have data to update, make call to backend
    $http({
      method: 'DELETE',
      url: `/api/events/${$state.params.id}/guests/${guestId}`
    }).then(result => {
      console.log('The updated data is: ', result.data);
      $scope.event = result.data;
    });
  };

  function getForecast(){
    if($scope.event && !$scope.event.isIndoors){
      const location = $scope.event.location;
      $http({
        method: 'GET',
        url: '/api/forecast',
        params: {
          lat: location.lat,
          lon: location.lon,
          time: $scope.event.eventDateTime
        }
      })
        .then(res => {
          console.log('the weather forcast is: ', res.data);
          $scope.weatherSummary = res.data;
        });
    }
  }

  function getCityMapperTime(){
    if($scope.event){
      $http({
        method: 'GET',
        url: `/api/users/${$scope.getPayload().sub}`
      })
        .then( res => {
          if($scope.isAuthenticated && res.data.homeLocation.lat && $scope.event.location.lat){
            $http({
              method: 'GET',
              url: '/api/citymapper/traveltime',
              params: {
                startLat: res.data.homeLocation.lat,
                startLon: res.data.homeLocation.lon,
                endLat: $scope.event.location.lat,
                endLon: $scope.event.location.lon
              }
            })
              .then(res => {
                console.log('the travel time is: ', res.data);
                $scope.homeTravelTime = res.data.travel_time_minutes;

              });
          }
        });
    }
  }

}



export default EventsShowCtrl;


//  PSUEDO CODE FOR UPDATING ATTENDEE LIST
//make a put request to event update
//send an update guest array
//  --> this should include all required fields


//  REMOVE/DISABLE BUTTON IF USER IS ATTENDING
//  check if current users id is with the attending array
