/**
 * Created by user on 11/06/17.
 */
angular.module('foxapp')

.controller('CreationController', ['$scope','GeolocationService','RESTService',

  function($scope, GeolocationService, RESTService){


    $scope.createPOI = function(){
      GeolocationService.getCurrentPosition({}).then(
        function(data){
          $scope.poi.coords = data;
        }
      ).then(
        function(){
          console.log($scope.poi);
          RESTService.post('http://ns388671.ip-176-31-254.eu/api/pois', $scope.poi);
        }
      );
      $scope.cancel();
    };

    $scope.form = {};

    $scope.poi = {};

    $scope.open = function() {

      $scope.creationPOI = true;
    };

    $scope.create = function() {

      $scope.creationPOI = false;
    };

    $scope.cancel = function() {
      $scope.creationPOI = true;
    };

}]);
