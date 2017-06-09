angular.module('foxapp')

  .controller('PhotoController', ['$scope', 'PictureUploadService', '$cordovaCamera',

    function ($scope, PictureUploadService, $cordovaCamera) {

      document.addEventListener("deviceready", function () {

        $scope.options = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };
      }, false);

      $scope.URL = {
        "plantinder": "http://ns388671.ip-176-31-254.eu/api/planders",
        "poi": "http://ns388671.ip-176-31-254.eu/api/poi"
      };

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
        image.then(function (imageData) {

            console.log(imageData);
            console.log('hhhh');
            PictureUploadService.upload(imageData, URL);
          }
        );
      };

      $scope.close = function () {
        $scope.uploadHide = true;
      }

    }]);
