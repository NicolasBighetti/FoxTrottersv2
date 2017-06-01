angular.module('foxapp')

  .controller('PhotoController',['$scope', '$cordovaCamera', '$ionicPopup',

    function($scope, $cordovaCamera, $ionicPopup) {

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
          var but = document.getElementById('upload');
          but.style = "visibility: visible;"
        }, function (err) {
          // error
        });
      }

      $scope.sendPicture = function () {
        console.log('ALERTE');
        var alertPopup = $ionicPopup.alert({
          title: 'Envoi réussi',
          template: 'Votre photo a bien été envoyé'
        });

        alertPopup.then(function(res) {
          // Custom functionality....
        });
      }

    }]);
