/*global L, $http */


//------map icons----- ///
const userIcon = L.icon({
  iconUrl: './assets/purple-marker.png',
  iconSize: [30, 30],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const mindIcon = L.icon({
  iconUrl: './assets/pink-marker.png',
  iconSize: [30, 30],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const bodyIcon = L.icon({
  iconUrl: './assets/green-marker.png',
  iconSize: [30, 30],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const soulIcon = L.icon({
  iconUrl: './assets/blue-marker.png',
  iconSize: [30, 30],
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
          if ($scope.event.category.toLowerCase() === 'mind'){
            const marker = L.marker([$scope.event.location.lat, $scope.event.location.lon], { icon: mindIcon }).addTo(map);
            marker.bindPopup(`<p>${$scope.event.eventTitle}</p>`);
          } else if($scope.event.category.toLowerCase() === 'body'){
            const marker = L.marker([$scope.event.location.lat, $scope.event.location.lon], { icon: bodyIcon }).addTo(map);
            marker.bindPopup(`<p>${$scope.event.eventTitle}</p>`);
        } else {
            const marker = L.marker([$scope.event.location.lat, $scope.event.location.lon], { icon: soulIcon }).addTo(map);
            marker.bindPopup(`<p>${$scope.event.eventTitle}</p>`);
        }
      };
      $scope.$watch('user', function() {
        if($scope.user) {
          // console.log('this is user ---->', $scope.user);
          map.setView([ $scope.user.homeLocation.lat, $scope.user.homeLocation.lon], 11);
          const marker = L.marker([$scope.user.homeLocation.lat, $scope.user.homeLocation.lon],{icon: userIcon} ).addTo(map);
          marker.bindPopup(`<img src=${$scope.user.imageUrl}>`);

          $scope.$watch('upcomingEvents', function() {
            if($scope.upcomingEvents) {
              const mindEvent = $scope.upcomingEvents.filter(event => event.category.toLowerCase() === 'mind');
              const bodyEvent = $scope.upcomingEvents.filter(event => event.category.toLowerCase() === 'body');
              const soulEvent = $scope.upcomingEvents.filter(event => event.category.toLowerCase() === 'soul');
              console.log('mind events are --->', mindEvent);
              console.log('upcoming events --->', $scope.upcomingEvents);
              mindEvent.forEach(event => {
                const marker = L.marker([event.location.lat, event.location.lon], {icon: mindIcon} ).addTo(map);
                marker.bindPopup(`<p>${event.eventTitle}</p>`);
              });
              bodyEvent.forEach(event => {
                const marker = L.marker([event.location.lat, event.location.lon], {icon: bodyIcon} ).addTo(map);
                marker.bindPopup(`<p>${event.eventTitle}</p>`);
              });
              soulEvent.forEach(event => {
                const marker = L.marker([event.location.lat, event.location.lon], {icon: soulIcon} ).addTo(map);
                marker.bindPopup(`<p>${event.eventTitle}</p>`);
              });

            }
          });

        }
      });
    }
  };
}

export default Map;
