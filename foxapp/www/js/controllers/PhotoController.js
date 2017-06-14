angular.module('foxapp')

  .controller('PhotoController', ['$scope', 'PictureUploadService', '$cordovaCamera', 'GeolocationService', 'MarkerService',

    function ($scope, PictureUploadService, $cordovaCamera, GeolocationService, MarkerService) {

      document.addEventListener("deviceready", function () {

        $scope.options = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };
      }, false);



      $scope.takePicture = function (options) {
        return $cordovaCamera.getPicture(options).then(function (imageData) {
          //var image = document.getElementById('myImage');
          //:image.src = /*"data:image/jpeg;base64," +*/ imageData;
          console.log(imageData);

          return imageData;
        }, function (err) {
          // error
        });
      };

      $scope.sendPicture = function (URL, image) {
        return image.then(function (imageData) {
            return PictureUploadService.upload(imageData, URL);
          }
        );
      };

      $scope.close = function () {
        $scope.uploadHide = true;
      };

      $scope.savePOI = function(imagePromise){
        return imagePromise.then(function (imageData) {
            var imagePath = imageData;
            GeolocationService.getCurrentPosition({}).then(
              function(coords){
                MarkerService.pushPosition(coords, imagePath);
              }
            );
          }
        );
      };

    }]);
