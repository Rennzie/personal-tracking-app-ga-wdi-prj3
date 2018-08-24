/*global L, $http */


//------map icons----- ///
const userIcon = L.icon({
  iconUrl: './assets/purple-marker.png',
  iconSize: [30, 30],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const icons = {
  mind: L.icon({
    iconUrl: './assets/pink-marker.png',
    iconSize: [30, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  }),
  body: L.icon({
    iconUrl: './assets/green-marker.png',
    iconSize: [30, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  }),
  soul: L.icon({
    iconUrl: './assets/blue-marker.png',
    iconSize: [30, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  })
}


function Map() {
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
          eventMap();
        }
      });
      $scope.$watch('user', function() {
        if($scope.user) {
          // console.log('this is user ---->', $scope.user);
          userMap();
        }
      });

      function userMap() {
        map.setView([ $scope.user.homeLocation.lat, $scope.user.homeLocation.lon], 11);
        const marker = L.marker([$scope.user.homeLocation.lat, $scope.user.homeLocation.lon],{icon: userIcon} ).addTo(map);
        marker.bindPopup(`<img src=${$scope.user.imageUrl}>`);

        $scope.$watch('upcomingEvents', function() {
          if($scope.upcomingEvents) {
            upcomingEventsMarkers();
          }
        });
      }

      function eventMap() {
        map.setView([ $scope.event.location.lat, $scope.event.location.lon], 15);
        const category = $scope.event.category.toLowerCase();
        const marker = L.marker([$scope.event.location.lat, $scope.event.location.lon], { icon: icons[category] }).addTo(map);
        marker.bindPopup(`<p>${$scope.event.eventTitle}</p>`);
      }

      function upcomingEventsMarkers() {
        $scope.upcomingEvents.forEach(event => {
          const category = event.category.toLowerCase();
          const marker = L.marker([event.location.lat, event.location.lon], {icon: icons[category]} ).addTo(map);
          marker.bindPopup(`<p>${event.eventTitle}</p>`);
        });
      }
    }
  };
}

export default Map;
