angular.module('foxapp')

.controller('GMapController', ['$scope', '$window','$location', '$cordovaGeolocation' ,'NgMap', 'MarkerService',

  function($scope, $window ,$location, $cordovaGeolocation, NgMap, MarkerService) {
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGMBQQC143VTbPWjLWEBJfB3LSzD0LnPw";
    //console.log(MarkerService.getMarkers());

    $scope.foxMarkers = MarkerService.getMarkers();

    MarkerService.getAllMarkers().then(function(data) {
      $scope.foxMarkers = data;
    });

    $scope.center = function() {

      var posOptions = [];

      $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(function (position) {
          var coord = [];


          coord.lat = position.coords.latitude;
          coord.long = position.coords.longitude;
          $scope.position = coord;

          console.log('la localisation');

        }, function (err) {
          var coord = [];
          console.log('default coord');
          console.log(err);
          coord.lat = 43.6156;
          coord.long = 7.0719;
          $scope.position = coord;
        });
    };

    $scope.center();

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
