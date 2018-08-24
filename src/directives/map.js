/*global L, $http */


//------map icons----- ///
const userIcon = L.icon({
  iconUrl: './assets/purple-marker.png',
  iconSize: [25, 30],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});




function Map($http) {
  return {
    restrict: 'A',
    link($scope, $element) {
      const domElement = $element[0];
      // console.log('the map element is', domElement);
      const map = L.map(domElement);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(map);
      $scope.$watch('event', function() {
        if ($scope.event) {
          // console.log('this is event', $scope.event);
          map.setView([ $scope.event.location.lat, $scope.event.location.lon], 15);

          const marker = L.marker([$scope.event.location.lat, $scope.event.location.lon]).addTo(map);
          marker.bindPopup(`<p>${$scope.event.eventTitle}</p>`);
        }
      });
      $scope.$watch('user', function() {
        if($scope.user) {
          // console.log('this is user ---->', $scope.user);
          map.setView([ $scope.user.homeLocation.lat, $scope.user.homeLocation.lon], 15);

          const marker = L.marker([$scope.user.homeLocation.lat, $scope.user.homeLocation.lon],{icon: userIcon} ).addTo(map);
          marker.bindPopup(`<p>${$scope.user.username}</p>`);

        }
      });
    }
  };
}

export default Map;
