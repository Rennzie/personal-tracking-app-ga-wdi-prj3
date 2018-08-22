// USER/SHOW

function UsersShowCtrl($http, $state, $scope) {
  const userId = $scope.getPayload().sub;
  $scope.addGoal = false;
  $scope.logHours = false;
  $scope.editGoal = false;

  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}`
  })
    .then(res => {
      // console.log('Found a user', res.data);
      $scope.user = res.data;
    });

  $scope.$watch('goals', () =>{
    updateCharts();
  });

  //check to see if the current user is the event owner
  // function checkProfileIsForUser(){
  //   if($scope.user){
  //     //check user is logged in
  //     if(!$scope.isAuthenticated()){
  //       $scope.checkProfileIsForUser = false;
  //     }
  //
  //     if(!$scope.event.createdBy._id){
  //       $scope.checkProfileIsForUser = false;
  //     }
  //
  //     if($scope.getPayload().sub === $state.params.id){
  //       $scope.checkProfileIsForUser = true;
  //     }else{
  //       $scope.checkProfileIsForUser = false;
  //     }
  //   }
  // }

  function updateCharts(){
    const mindColor = 'rgb(255,0,204)';
    const bodyColor = 'rgb(204,255,0)';
    const soulColor = 'rgb(0,204,255)';
    const mindColorFade = 'rgba(255,0,204,0.3)';
    const bodyColorFade = 'rgba(204,255,0,0.3)';
    const soulColorFade = 'rgba(0,204,255,0.3)';

    const cutOutPercentage = 85;

    const goalData = $scope.goals[0];

    $scope.labels = ['Remaining', 'Completed'];
    $scope.targetLabels = ['Mind', 'Body', 'Soul'];

    $scope.targetCharColors = [mindColorFade, bodyColorFade, soulColorFade];

    $scope.mindCharColors = [mindColorFade, mindColor];
    $scope.bodyCharColors = [bodyColorFade, bodyColor];
    $scope.soulCharColors = [soulColorFade, soulColor];
    $scope.multiCharColors = [
      [mindColorFade, mindColor],
      [bodyColorFade, bodyColor],
      [soulColorFade, soulColor]
    ];

    if($scope.user){
      $scope.targetData = [goalData.mindTarget, goalData.bodyTarget, goalData.soulTarget];

      $scope.mindData = [goalData.timeToMindGoal, goalData.mindCompleted];
      $scope.bodyData = [goalData.timeToBodyGoal, goalData.bodyCompleted];
      $scope.soulData = [goalData.timeToSoulGoal, goalData.soulCompleted];

      $scope.multiData =  [
        [goalData.timeToMindGoal, goalData.mindCompleted],
        [goalData.timeToBodyGoal, goalData.bodyCompleted],
        [goalData.timeToSoulGoal, goalData.soulCompleted]
      ];

      $scope.mindCharOptions = {
        title: {
          display: true,
          text: 'Mind',
          fontSize: 30,
          fontStyle: 'bold'
        },
        maintainAspectRatio: false,
        cutoutPercentage: cutOutPercentage,
        animation: {
          animateScale: true
        },
        elements: {
          center: {
            text: `Target \n ${goalData.mindTarget} Hrs`,
            color: mindColor, //Default black
            fontStyle: 'Helvetica', //Default Arial
            sidePadding: 15 //Default 20 (as a percentage)
          }
        }
      };

      $scope.bodyCharOptions = {
        title: {
          display: true,
          text: 'Body',
          fontSize: 30,
          fontStyle: 'bold'
        },
        maintainAspectRatio: false,
        cutoutPercentage: cutOutPercentage,
        animation: {
          animateScale: true
        },
        elements: {
          center: {
            text: `Target \n ${goalData.bodyTarget} Hrs`,
            color: bodyColor, //Default black
            fontStyle: 'Helvetica', //Default Arial
            sidePadding: 15 //Default 20 (as a percentage)
          }
        }
      };

      $scope.soulCharOptions = {
        title: {
          display: true,
          text: 'Soul',
          fontSize: 30,
          fontStyle: 'bold'
        },
        maintainAspectRatio: false,
        cutoutPercentage: cutOutPercentage,
        animation: {
          animateScale: true
        },
        elements: {
          center: {
            text: `Target \n ${goalData.soulTarget} Hrs`,
            color: soulColor, //Default black
            fontStyle: 'Helvetica', //Default Arial
            sidePadding: 15 //Default 20 (as a percentage)
          }
        }
      };

    }
  }


  // {
  //   datasets: [
  //     {data: $scope.mindData},
  //     {data: $scope.bodyData},
  //     {data: $scope.soulData}
  //   ]
  // };

  $scope.becomeAHost = function() {
    const updateUserData = $scope.user;
    updateUserData.isHost = true;

    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.id}`,
      data: JSON.stringify(updateUserData)
    })
      .then(res =>{
        // console.log('User is now host: ', res.data.isHost);
        $scope.user = res.data;
      } );
  };

  $scope.addHosterName = function(){
    const updateUserData = $scope.user;
    updateUserData.hasHostName = true;

    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.id}`,
      data: JSON.stringify(updateUserData)
    })
      .then(res =>{
        // console.log('User host name is: ', res.data);
        $scope.user = res.data;
      } );
  };

  //FETCH USERS GOALS AND ADD TO STATE
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}/goals`
  })
    .then(res => {
      const userGoals = res.data.filter(goal => goal.createdBy === userId );
      const currentMonthGoals = userGoals.filter(goal => goal.goalMonth === $scope.currentMonth);
      // console.log('the users goals are ', currentMonthGoals);
      $scope.goals = currentMonthGoals;
    });

  //request to events an adds them on to scope
  $http({
    method: 'GET',
    url: '/api/events'
  })
    .then(res => {

      // returns all the events the user has attended, past and present
      const usersEvents = res.data.filter(event => {
        return event.guests.some(guest => guest === $scope.user._id);
      });

      //returns all the events the user is not attending
      $scope.userNotAttending = res.data.filter(event => {
        return event.guests.some(guest => guest !== $scope.user._id);
      });
      $scope.attendedEvents = usersEvents.filter(event => event.concluded === true);
      $scope.upcomingEvents = usersEvents.filter(event => event.concluded === false);
    }
    );


}

export default UsersShowCtrl;
