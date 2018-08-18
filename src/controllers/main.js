function MainCtrl($scope, $auth, $state, $rootScope, $timeout) {
  // NOTE: isAuthenticated is a function!!
  $scope.isAuthenticated = $auth.isAuthenticated; // now available in every view and controller

  $rootScope.$on('flashMessage', (e, data) => {
    $scope.flashMessage = data;

    $timeout(() => $scope.flashMessage = null, 3000);
  });


  $scope.logout = function() {
    $auth.logout();
    $state.go('home');
  };
}

export default MainCtrl;
