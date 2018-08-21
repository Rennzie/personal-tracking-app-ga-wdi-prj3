import moment from 'moment';

function MainCtrl($scope, $auth, $state, $rootScope, $timeout) {
  // NOTE: isAuthenticated is a function!!
  $scope.isAuthenticated = $auth.isAuthenticated; // now available in every view and controller
  $scope.getPayload = $auth.getPayload;

  $scope.currentMonth = moment().format('MMMM');
  $scope.daysRemainingInMonth = moment().daysInMonth() - moment().date();

  $rootScope.$on('flashMessage', (e, data) => {
    $scope.flashMessage = data;

    $timeout(() => $scope.flashMessage = null, 3000);
  });


  $scope.logout = function() {
    // console.log('loggin user was=========> ', $auth.getPayload().sub);
    $auth.logout();
    $state.go('home');
  };
}

export default MainCtrl;
