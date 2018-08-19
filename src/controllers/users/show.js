function UsersShowCtrl($http, $state, $scope) {
  const userId = '5b791967e2a00a06e441ac6d';
  console.log('The user Id should be ==========> ' + userId);

  $http({
    method: 'GET',
    url: `/api/users/${userId}`
  })
    .then(res => {
      console.log('Found a user', res.data);
      $scope.user = res.data;
    });
}

export default UsersShowCtrl;
