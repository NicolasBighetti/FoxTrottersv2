angular.module('foxapp')

  .controller('SlideCtrl', ['$scope','$ionicSlideBoxDelegate',

    function($scope, $ionicSlideBoxDelegate) {

      $scope.logSlideChanged = function (index) {

        console.log("we Are "+ index);

        if(index === 0) {
          $ionicSlideBoxDelegate.enableSlide(false);
        }
        else {
          $ionicSlideBoxDelegate.enableSlide(true);
        }
      };

    }]);
