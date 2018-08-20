function UsersShowCtrl($http, $state, $scope) {

  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}`
  })
    .then(res => {
      console.log('Found a user', res.data);
      $scope.user = res.data;
    });

  $scope.$watch('goals', () => updateGoals())
  $scope.becomeAHost = function() {
    const updateUserData = $scope.user;
    updateUserData.isHost = true;

    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.id}`,
      data: JSON.stringify(updateUserData)
    })
      .then(res =>{
        console.log('User is now host: ', res.data.isHost);
        $scope.user = res.data;
      } );
  };

  $scope.addHosterName = function(){ // NOTE: pull this down into a single function
    const updateUserData = $scope.user;
    updateUserData.hasHostName = true;

    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.id}`,
      data: JSON.stringify(updateUserData)
    })
      .then(res =>{
        console.log('User host name is: ', res.data);
        $scope.user = res.data;
      } );
  };

  function updateGoals() {
    if($scope.goals) {
      $http({
        method: 'GET',
        url: `/api/users/${$state.params.id}/goals`
      })
        .then(res => {
          const currentUser = $scope.getPayload().sub;
          // console.log('current user is', currentUser);
          // console.log('Found a goal', res.data);
          $scope.goals = res.data.filter(goal => goal.createdBy === currentUser );
          // console.log('scope is now', $scope.goals);
        });

    }


  }


  $scope.setTarget = function() {
    const userId = $scope.getPayload().sub;
    const goalData = [
      {
        discipline: 'mind',
        createdBy: userId,
        targetHrs: $scope.goal.mindTarget
      },{
        discipline: 'body',
        createdBy: userId,
        targetHrs: $scope.goal.mindTarget

      },{
        discipline: 'soul',
        createdBy: userId,
        targetHrs: $scope.goal.mindTarget

      }
    ];
    console.log('---->', goalData);
    $http({
      method: 'POST',
      url: `/api/users/${userId}/goals`,
      data: goalData

    })
      .then(response => $scope.goals = response.data);


  };


}

export default UsersShowCtrl;
