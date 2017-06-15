/**
 * Created by user on 14/06/17.
 */
angular.module('foxapp')

.controller('ListResultController',['$scope','PhotoService','PictureUploadService','RESTService',
  function($scope, PhotoService, PictureUploadService, RESTService){
      $scope.listResult = [];

      $scope.showResults = true;
    
      PhotoService.readyCamera();

      $scope.takePicture = function(){
        return PhotoService.takePicture(PhotoService.cameraDefaultOps);
      };

      $scope.uploadPhoto = function(){

      };

    $scope.recognizePlant = function(promise){
      promise.then(
        function(data){
          if(data === undefined){
            return;
          }

          PictureUploadService.upload(data, dbPath + "api/planders/").then(
            function(data) {
              var json = JSON.parse(data);

              RESTService.get(dbPath + "api/planders/result/" + json._id).then(
                function (result) {
                  $scope.listResult = JSON.parse(result);
                  $scope.showResults = false;
                }
              );
            }
          );


        }
      );
    };
  }]);
