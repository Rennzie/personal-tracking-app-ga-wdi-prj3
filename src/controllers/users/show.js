// USER/SHOW

function UsersShowCtrl($http, $state, $scope) {
  const userId = $scope.getPayload().sub;
  $scope.addGoal = false;
  $scope.logHours = false;
  $scope.editGoal = false;

  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}`
  })
    .then(res => {
      console.log('Found a user', res.data);
      $scope.user = res.data;
    });

  $scope.$watch('event', checkProfileIsForUser() );

  //check to see if the current user is the event owner
  function checkProfileIsForUser(){
    if($scope.user){
      //check user is logged in
      if(!$scope.isAuthenticated()){
        $scope.checkProfileIsForUser = false;
      }

      if(!$scope.event.createdBy._id){
        $scope.checkProfileIsForUser = false;
      }

      if($scope.getPayload().sub === $state.params.id){
        $scope.checkProfileIsForUser = true;
      }else{
        $scope.checkProfileIsForUser = false;
      }
    }
  }

  $scope.becomeAHost = function() {
    const updateUserData = $scope.user;
    updateUserData.isHost = true;

    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.id}`,
      data: JSON.stringify(updateUserData)
    })
      .then(res =>{
        // console.log('User is now host: ', res.data.isHost);
        $scope.user = res.data;
      } );
  };

  $scope.addHosterName = function(){
    const updateUserData = $scope.user;
    updateUserData.hasHostName = true;

    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.id}`,
      data: JSON.stringify(updateUserData)
    })
      .then(res =>{
        // console.log('User host name is: ', res.data);
        $scope.user = res.data;
      } );
  };

  //FETCH USERS GOALS AND ADD TO STATE
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}/goals`
  })
    .then(res => {
      const userGoals = res.data.filter(goal => goal.createdBy === userId );

      const currentMonthGoals = userGoals.filter(goal => goal.goalMonth === $scope.currentMonth);

      console.log('the users goals are ', currentMonthGoals);
      $scope.goals = currentMonthGoals;
    });

  //request to events an adds them on to scope
  $http({
    method: 'GET',
    url: '/api/events'
  })
    .then(res => {
      const usersEvents = res.data.filter(event => event.guests.id === $scope.user.id);

      const concludedEvents = usersEvents.filter(event => event.concluded === true);
      const upcomingEvents = usersEvents.filter(event => event.concluded === false);
      console.log('concluded events', concludedEvents);
      console.log('upcoming events', upcomingEvents);
      $scope.concludedEvents = concludedEvents;
      $scope.upcomingEvents = upcomingEvents;
    }
    );
}

export default UsersShowCtrl;
