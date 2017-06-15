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
        return PhotoService.takePicture(PhotoService.cameraDefaultOps);
      };

    $scope.recognizePlant = function(promise){
      promise.then(
        function(data){
          console.log("Data : " + data);
          var json = JSON.parse(data);
          console.log("been there");

          RESTService.get(dbPath + "api/planders/result/"+json._id).then(
            function(result){


              console.log("Result : " + result);
              var jsson = JSON.parse(result);

              $scope.answerder = jsson.results[0].name;

              $scope.listResult = jsson.splice(0, 5);

              console.log($scope.listResult);

            }
          );
        }
      );
    };
  }]);
