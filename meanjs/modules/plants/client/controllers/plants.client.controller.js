(function () {
  'use strict';

  // Plants controller
  angular
    .module('plants')
    .controller('PlantsController', PlantsController);

  PlantsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'plantResolve'];

  function PlantsController ($scope, $state, $window, Authentication, plant) {
    var vm = this;

    vm.authentication = Authentication;
    vm.plant = plant;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Plant
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.plant.$remove($state.go('plants.list'));
      }
    }

    // Save Plant
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.plantForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.plant._id) {
        vm.plant.$update(successCallback, errorCallback);
      } else {
        vm.plant.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('plants.view', {
          plantId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Gets the themes
    $http.get(DB_PATH+'/api/themes').then(function (res) {
      console.dir(res);
      vm.themes = res.body;
    },function (err) {
      console.error(err);
    });
  }
}());


//Dynamic form for plants uses
var app = angular.module('angularjs-starter', []);

app.controller('useFormCtrl', function($scope) {

  $scope.useList = [];

  $scope.addNewUse = function() {
    var newItemNo = $scope.useList.length+1;
    $scope.choices.push({'theme':'use'+newItemNo});
  };

  $scope.removeUse = function() {
    var lastItem = $scope.useList.length-1;
    $scope.choices.splice(lastItem);
  };

});
