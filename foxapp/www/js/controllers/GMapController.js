angular.module('foxapp')

.controller('GMapController', ['$scope', 'NgMap', 'MarkerService',

  function($scope, NgMap, MarkerService) {
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGMBQQC143VTbPWjLWEBJfB3LSzD0LnPw";

    $scope.foxMarkers = MarkerService.getMarkers();
    /*NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);


  });*/
    console.log(MarkerService.getMarkers());
    console.log($scope.foxMarkers);
}]);
