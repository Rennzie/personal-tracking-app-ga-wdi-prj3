import moment from 'moment';

function MainCtrl($scope,$http, $auth, $state, $rootScope, $timeout) {
  // NOTE: isAuthenticated is a function!!
  $scope.isAuthenticated = $auth.isAuthenticated; // now available in every view and controller
  $scope.getPayload = $auth.getPayload;
  $scope.currentMonth = moment().format('MMMM');
  $scope.daysRemainingInMonth = moment().daysInMonth() - moment().date();

  if($auth.isAuthenticated()){
    getUserData();
  }

  //need to watch for a new token on login.
  $rootScope.$watch('loggedIn', () => {
    getUserData();
  });

  $scope.token = $auth.getPayload();

  function getUserData(){
    //////////--------REQUEST THE USERS INFO-------////////////
    if($auth.getPayload().sub){
      $http({
        method: 'GET',
        url: `/api/users/${$auth.getPayload().sub}`
      })
        .then(res => $scope.userData = res.data);
    }
  }

  $scope.activeMenu = 'in-active';
  $scope.selected = false;

  $scope.isClicked = function(){
    if(!$scope.selected){
      $scope.selected = true;
    }else{
      $scope.selected = false;
    }
  };

  $rootScope.$on('flashMessage', (e, data) => {
    console.log('flash fired!', data);
    $scope.flashMessage = data;
    $timeout(() => $scope.flashMessage = null, 3000);
  });


  $scope.logout = function() {
    $rootScope.loggedIn = false;
    // console.log('loggin user was=========> ', $auth.getPayload().sub);
    $auth.logout();
    $state.go('home');
  };
}

export default MainCtrl;
