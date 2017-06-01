angular.module('foxapp')

  .controller('PhotoController',['$scope', '$cordovaCamera',

    function($scope, $cordovaCamera) {

      document.addEventListener("deviceready", function () {

        $scope.options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };
          }, false);

      $scope.takePicture = function(options) {
        $cordovaCamera.getPicture(options).then(function (imageData) {
          var image = document.getElementById('myImage');
          image.src = /*"data:image/jpeg;base64," +*/ imageData;
        }, function (err) {
          // error
        });
      }

    }]);
