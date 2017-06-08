angular.module('foxapp')

.controller('GMapController', ['$scope', '$interval','$window','$location', '$cordovaGeolocation' ,'NgMap', 'MarkerService',

  function($scope, $interval, $window ,$location, $cordovaGeolocation, NgMap, MarkerService) {
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGMBQQC143VTbPWjLWEBJfB3LSzD0LnPw";
    //console.log(MarkerService.getMarkers());

    $scope.GPSTrace = [];

    $scope.foxMarkers = MarkerService.getMarkers();

    MarkerService.getAllMarkers().then(function(data) {
      $scope.foxMarkers = data;
    });

    $scope.getGPSPosition = function(posOptions) {

      return $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(function (position) {
          var coord = [];


          coord.lat = position.coords.latitude;
          coord.lng = position.coords.longitude;
          console.log('la localisation');

          return coord;


        }, function (err) {
          var coord = [];
          console.log('default coord');
          console.log(err);
          coord.lat = 43.6156;
          coord.lng = 7.0719;

          return coord;
        });
    };

    $scope.center = function() {
      var posOptions = [];
      $scope.getGPSPosition(posOptions).then( function(coords){
        $scope.position = coords;
      });

    };

    $scope.center();

    $scope.savePosition = function(){
      var posOptions = [];
      $scope.getGPSPosition(posOptions).then( function(coords){
        $scope.GPSTrace.push(
          [coords.lat, coords.lng]
        )
      });
      console.log($scope.GPSTrace);
    };

    $interval($scope.savePosition, 15000);

    $scope.tinderise = function(){
      $scope.tinderswitch = false;
    };

    $scope.swipeend = function(){
      $scope.tinderswitch = true;
    };

    $scope.tinderswitch = true;

    $scope.category = "";

    $scope.changeFilter = function(criteria){
      $scope.category = criteria;
    }

    $scope.showDetail = function(poi) {
      $scope.poi = poi;
      $scope.map.showInfoWindow('foo-iw', poi.name);

    // TODO: show details by clicking on them



    };

    $scope.hideDetail = function() {
      $scope.map.hideInfoWindow('foo-iw');
    };

}]);
