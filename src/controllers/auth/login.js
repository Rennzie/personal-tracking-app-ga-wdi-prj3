function AuthLoginCtrl($scope, $http, $state, $auth) {
  $scope.login = function() {
    console.log('logging in');
    $http({
      method: 'POST',
      url: '/api/login',
      data: $scope.user
    });
    $auth.login($scope.user)
      .then(() => $state.go('eventsIndex'))
      .catch(err => console.log('there was an error', err));
  };

}

export default AuthLoginCtrl;
