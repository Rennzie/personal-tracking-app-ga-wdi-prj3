import moment from 'moment';

function MainCtrl($scope,$http, $auth, $state, $rootScope, $timeout) {
  // NOTE: isAuthenticated is a function!!
  $scope.isAuthenticated = $auth.isAuthenticated; // now available in every view and controller
  $scope.getPayload = $auth.getPayload;

  if($auth.isAuthenticated()){
    getUserData();
  }

  //need to watch for a new token on login.
  $scope.$watch('token', () => {
    getUserData();
  });

  $scope.token = $auth.getPayload();

  function getUserData(){
    //////////--------REQUEST THE USERS INFO-------////////////
    $http({
      method: 'GET',
      url: `/api/users/${$auth.getPayload().sub}`
    })
      .then(res => $scope.userData = res.data);
  }

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
