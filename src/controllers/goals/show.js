// GOALS/SHOW

function GoalsShowCtrl($http, $state, $scope){
  const userId = $scope.getPayload().sub;
  //fetch the users goals
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}/goals`
  })
    .then(res => {
      const userGoals = res.data.filter(goal => goal.createdBy === userId );
      console.log('the users goals are ', userGoals);
      $scope.goals = userGoals;
    });
}

export default GoalsShowCtrl;
