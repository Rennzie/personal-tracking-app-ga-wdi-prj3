function UsersShowCtrl($http, $state, $scope) {
  $http({
    method: 'GET',
    url: `/api/users/${$state.params._id}`
  })
    .then(res => {
      console.log('Found a user', res.data);
      $scope.user = res.data;
    });
}

export default UsersShowCtrl;
