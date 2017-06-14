angular.module('foxapp')

.factory('PhotoService',['$cordovaCamera','$ionicPlatform',
    function( $cordovaCamera, $ionicPlatform){

      var cameraDefault= {};
      $ionicPlatform.ready(function(){
        cameraDefault = {
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
      });

      return{
        cameraDefaultOps : cameraDefault,

        readyCamera : function(){
          document.addEventListener("deviceready", function () {
            //$scope.options = cameraDefault;
          }, false);
        },
        takePicture : function (options) {
        return $cordovaCamera.getPicture(options).then(function (imageData) {
          //var image = document.getElementById('myImage');
          //:image.src = /*"data:image/jpeg;base64," +*/ imageData;
          console.log(imageData);

          return imageData;
        }, function (err) {
          // error
        });
      }



      };
    }]);
