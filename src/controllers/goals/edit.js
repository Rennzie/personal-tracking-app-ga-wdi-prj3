function GoalsEditCtrl($http, $rootScope, $scope, $state){
  $scope.editGoal = true;

  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}/goals`
  })
    .then(res => {
      const userGoals = res.data.filter(goal => goal.createdBy === $scope.getPayload().sub );

      const currentMonthGoals = userGoals.filter(goal => goal.goalMonth === $scope.currentMonth);

      // console.log('the users goals are ', currentMonthGoals);
      $scope.goal = currentMonthGoals[0];
    });

  $scope.editGoals = function() {
    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.userId}/goals/${$state.params.goalId}`,
      data: $scope.goal
    })
      .then(res =>{
        $scope.goal = res.data;
        $state.go('usersShow', {id: $scope.getPayload().sub});
      });

    $rootScope.$broadcast('flashMessage', {
      type: 'success',
      content: 'Goals Updated'
    });
  };
}

export default GoalsEditCtrl;
