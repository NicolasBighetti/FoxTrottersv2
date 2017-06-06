angular.module('foxapp')

.controller('GMapController', ['$scope', '$window','$location', 'NgMap', 'MarkerService',

  function($scope, $window ,$location, NgMap, MarkerService) {
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGMBQQC143VTbPWjLWEBJfB3LSzD0LnPw";
    //console.log(MarkerService.getMarkers());

    MarkerService.getAllMarkers().then(function(data) {
      $scope.foxMarkers = data;
    });


    $scope.tinderise = function(){
      $scope.tinderswitch = false;
    }

    $scope.swipeend = function(){
      $scope.tinderswitch = true;
    };

    $scope.tinderswitch = true;

    $scope.category = "";

    $scope.changeFilter = function(criteria){
      $scope.category = criteria;
    }

}]);
