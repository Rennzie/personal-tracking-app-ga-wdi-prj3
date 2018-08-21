function GoalsEditCtrl($http, $scope, $state){
  $scope.logHours = true;

  $scope.goal = {};

  console.log('goal id is ', $state.params.goalId);

  $scope.logHoursSubmit = function() {
    console.log('goal update is: ===> ', $scope.goal);
    $http({
      method: 'PUT',
      url: `/api/goals/${$state.params.goalId}/loghours`,
      data: $scope.goal
    })
      .then(res =>{
        $scope.goal = res.data;
        $state.go('usersShow', {id: $scope.getPayload().sub});
      });
  };

}

export default GoalsEditCtrl;
