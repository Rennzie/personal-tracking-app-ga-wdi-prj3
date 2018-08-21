// GOALS/SHOW
// import moment from 'moment';

function GoalsShowCtrl($http, $state, $scope){
  const userId = $scope.getPayload().sub;
  //fetch the users goals
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}/goals`
  })
    .then(res => {
      const userGoals = res.data.filter(goal => goal.createdBy === userId );

      const currentMonthGoals = userGoals.filter(goal => goal.goalMonth === $scope.currentMonth);

      console.log('the users goals are ', currentMonthGoals);
      $scope.goals = currentMonthGoals[0];
    });


}

export default GoalsShowCtrl;
