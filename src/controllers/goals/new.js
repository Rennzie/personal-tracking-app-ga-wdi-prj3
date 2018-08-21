function GoalsNewCtrl($http, $scope, $state){
  const userId = $scope.getPayload().sub;
  $scope.addGoal = true;

  $scope.goal = {};

  // console.log('scope is: ', $scope);

  console.log('current user is', userId);
  $scope.setTarget = function() {
    $scope.goal.createdBy = userId;
    const goalData = $scope.goal;
    console.log('Data to update is---->', goalData);
    $http({
      method: 'POST',
      url: `/api/users/${userId}/goals`,
      data: goalData

    })
      .then(() => $state.go('usersShow',{id: userId}));
  };
}

//month should auto populate to the current month

export default GoalsNewCtrl;
