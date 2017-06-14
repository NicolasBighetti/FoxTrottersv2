/**
 * Created by user on 14/06/17.
 */
angular.module('foxapp')

.controller('ListResultController',['$scope','PhotoService',
  function($scope, PhotoService){
      $scope.listResult = [];

      console.log(PhotoService.cameraDefaultOps);

      PhotoService.readyCamera();

      $scope.takePicture = function(){
        console.log('shaprrr');
        PhotoService.takePicture(PhotoService.cameraDefaultOps);
      };
  }]);
