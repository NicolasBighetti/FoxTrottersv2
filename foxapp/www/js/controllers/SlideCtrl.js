angular.module('foxapp')

  .controller('SlideCtrl', ['$scope',

    function($scope) {
      $scope.logSlideChanged = function (index) {
        console.log('Slide changed to '+index);
      }

    }]);
