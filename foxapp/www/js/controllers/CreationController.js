/**
 * Created by user on 11/06/17.
 */
angular.module('foxapp')

  .controller('CreationController', ['$scope', 'GeolocationService', 'RESTService', 'PictureUploadService',

    function ($scope, GeolocationService, RESTService, PictureUploadService) {
      console.log('CreationController');

      $scope.url = dbPath+"api/planders";
      $scope.poi = {};
      $scope.poi.typep = "plant";

      $scope.createPoi = function () {
        $scope.poi.coords = {};
        $scope.poi.coords.latitude = $scope.position.lat;
        $scope.poi.coords.longitude = $scope.position.lng;
        console.log($scope.poi);
        PictureUploadService.upload($scope.pictureURI, $scope.url).then(function (data) {
          var json = JSON.parse(data);
          $scope.poi.image = json.image;
          RESTService.post(dbPath+'api/pois', $scope.poi).then(function () {
            $scope.getAllMarkers();
            $scope.poi = {};
          });
        });
        $scope.cancelPoi();
      };

      console.log('chiwawa');
    }]);
