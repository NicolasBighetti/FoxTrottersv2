angular.module('foxapp')

.controller('GMapController', ['$scope', '$interval','$window','$location', '$cordovaVibration','GeolocationService' ,'NgMap', 'MarkerService', 'SmartWatchService',

  function($scope, $interval, $window ,$location, $cordovaVibration, GeolocationService, NgMap, MarkerService, SmartWatchService) {

    // $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGMBQQC143VTbPWjLWEBJfB3LSzD0LnPw";
    // console.log(MarkerService.getMarkers());

    $scope.GPSTrace = [];

    $scope.foxMarkers = MarkerService.getMarkers();

    MarkerService.getAllMarkers().then(function(data) {
      $scope.foxMarkers = data;
    });

    $scope.getGPSPosition = function(posOptions) {
      return GeolocationService.getCurrentPosition(posOptions);
    };

    $scope.center = function() {
      var posOptions = [];

      $scope.getGPSPosition(posOptions).then( function(coords){
        $scope.position = coords;
      }, function (err) {
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
    };

    $scope.checkProximity = true;

    $scope.notifyProximity = function(){
      if($scope.checkProximity) {
        var triggerDistance = 5;

        $scope.getGPSPosition([]).then( function(coords){
          for(var mrk in $scope.foxMarkers){
            if(GeolocationService.getDistanceFromLatLonInKm(coords.lat, coords.lng, $scope.foxMarkers[mrk].coords.latitude, $scope.foxMarkers[mrk].coords.longitude) <= triggerDistance){
                $cordovaVibration.vibrate(100);
                SmartWatchService.notificate();
              break;
            }
          }
        });

      }
    };

    $interval($scope.savePosition, 15000);
    $interval($scope.notifyProximity, 5000);


    $scope.tinderise = function(){
      $scope.tinderswitch = false;
    };

    $scope.addPOI = function(){
      $scope.creationPOI = !$scope.creationPOI;
    };

    $scope.swipeend = function(){
      $scope.tinderswitch = true;
    };

    $scope.tinderswitch = true;

    $scope.creationPOI = true;


    $scope.category = "";

    $scope.changeFilter = function(criteria){
      $scope.category = criteria;
    };

    // Shows the informations of the marker once you clicked on it
    $scope.showDetail = function(e, poi) {
      $scope.poi = poi;
      $scope.map.showInfoWindow('foo-iw', poi._id);
    };

    $scope.hideDetail = function() {
      $scope.map.hideInfoWindow('foo-iw');
    };

}]);
