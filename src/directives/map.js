/*global L*/

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
    }
  };
}

export default Map;
