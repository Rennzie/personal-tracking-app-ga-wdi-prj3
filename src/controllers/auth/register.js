function AuthRegisterCtrl($scope, $auth, $state) {
  $scope.user = {
    firstName: 'Sophie',
    surname: 'Cornish',
    username: 'scornish',
    email: `s${Math.random().toFixed(2)}@cornish.biz`,
    postcode: 'CV4 8AL',
    password: 'pass',
    passwordConfirmation: 'pass'
  };
  $scope.register = function() {
    $auth
      .signup($scope.user)
      // .login($scope.user)
      .then(()=> $state.go('login'));
  };

}

export default AuthRegisterCtrl;
