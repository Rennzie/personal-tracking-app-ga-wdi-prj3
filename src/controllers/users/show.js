// USER/SHOW

function UsersShowCtrl($http, $state, $scope) {
  const userId = $scope.getPayload().sub;


  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}`
  })
    .then(res => {
      // console.log('Found a user', res.data);
      $scope.user = res.data;
    });

  // $scope.$watch('goals', () => updateGoals())
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

  $scope.addHosterName = function(){
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


  //need to update teh scope once the setTarget is made


  $scope.setTarget = function() {
    $scope.goal.createdBy = userId;
    const goalData = $scope.goal;
    console.log('Data to update is---->', goalData);
    $http({
      method: 'POST',
      url: `/api/users/${userId}/goals`,
      data: goalData

    })
      .then(response => {
        console.log('the returned data is', response.data.goals);
        $scope.goals = response.data.goals;
      } );
  };

  $scope.addGoal = 'not-active';
  $scope.activateAddGoal = function(){
    if ($scope.addGoal === 'not-active')
      $scope.addGoal = 'is-active';
    else
      $scope.addGoal = 'not-active';
  };


}

export default UsersShowCtrl;
