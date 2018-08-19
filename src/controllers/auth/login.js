function AuthLoginCtrl($scope, $http, $state, $auth) {
  $scope.login = function() {
    console.log('logging in');
    // $http({  // NOTE: we dont need the $http request as satellizer takes care of that for us
    //   method: 'POST',
    //   url: '/api/login',
    //   data: $scope.user
    // });
    $auth.login($scope.user)
      .then(result => {
        console.log('logging in results in: ', result);
        $state.go('eventsIndex');
      })
      .catch(err => console.log('there was an error', err));
  };

}

export default AuthLoginCtrl;
