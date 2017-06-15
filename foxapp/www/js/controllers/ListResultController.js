/**
 * Created by user on 14/06/17.
 */
angular.module('foxapp')

.controller('ListResultController',['$scope','PhotoService','PictureUploadService','RESTService',
  function($scope, PhotoService, PictureUploadService, RESTService){
      $scope.listResult = [];

      $scope.showResults = true;

      console.log(PhotoService.cameraDefaultOps);

      PhotoService.readyCamera();

      $scope.takePicture = function(){
        console.log('shaprrr');
        return PhotoService.takePicture(PhotoService.cameraDefaultOps);
      };

      $scope.uploadPhoto = function(){

      };

    $scope.recognizePlant = function(promise){
      promise.then(
        function(data){
          console.log("Data : " + data);

          if(data === undefined){
            return;
          }

          PictureUploadService.upload(data, dbPath + "api/planders/").then(
            function(data) {
              var json = JSON.parse(data);
              console.log("been there");

              RESTService.get(dbPath + "api/planders/result/" + json._id).then(
                function (result) {


                  console.log("Result : " + result);
                  $scope.listResult = JSON.parse(result);
                  $scope.showResults = false;
                  console.log($scope.listResult);

                }
              );
            }
          );


        }
      );
    };
  }]);
