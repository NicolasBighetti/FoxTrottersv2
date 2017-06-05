(function () {
  'use strict';

  // Planders controller
  angular
    .module('planders')
    .controller('PlandersController', PlandersController);

  PlandersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'planderResolve'];

  function PlandersController ($scope, $state, $window, Authentication, plander) {
    var vm = this;

    vm.authentication = Authentication;
    vm.plander = plander;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Plander
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.plander.$remove($state.go('planders.list'));
      }
    }

    // Save Plander
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.planderForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.plander._id) {
        vm.plander.$update(successCallback, errorCallback);
      } else {
        vm.plander.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('planders.view', {
          planderId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
