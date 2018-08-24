function AuthLoginCtrl($rootScope, $scope, $http, $state, $auth) {
  $scope.login = function() {
    // console.log('logging in');
    $auth.login($scope.user)
      .then(result => {
        $rootScope.loggedIn = true;
        $rootScope.$broadcast('flashMessage', {
          type: 'success',
          content: result.data.message
        });
        // console.log('logging in results in: ', result);
        // console.log('The login payload is', $auth.getPayload());
        $state.go('eventsIndex');
      })
      .catch(err =>{

        console.log('there was an error', err);
      });
  };

}

export default AuthLoginCtrl;
