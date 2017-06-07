(function () {
  'use strict';

  // Planders controller
  angular
    .module('planders')
    .controller('PlandersController', PlandersController);

  PlandersController.$inject = ['$scope', '$state', '$window', 'planderResolve', 'Authentication', 'Notification', 'Upload', '$timeout'];

  function PlandersController ($scope, $state, $window,plander, Authentication, Notification, Upload, $timeout) {
    var vm = this;

    vm.authentication = Authentication;
    vm.plander = plander;

    console.log('plander');
    console.dir(plander);
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Plander
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.plander.$remove($state.go('planders.list'));
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Planders deleted successfully!' });

      }
    }

    // Save Plander
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.planderForm');
        return false;
      }

      // TODO: move create/update logic to service
/*      if (vm.plander._id) {
        vm.plander.$update(successCallback, errorCallback);
      } else {
        vm.plander.$save(successCallback, errorCallback);
      }*/

      // Create a new plander, or update the current instance
      vm.plander.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('planders.view', {
          planderId: res._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Planders saved successfully!' });

      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }




      vm.user = Authentication.user;
      vm.progress = 0;

      vm.upload = function (dataUrl) {
        console.log('upload ...');
        console.dir(dataUrl);
        console.dir(vm.plander);
        Upload.upload({
          url: '/api/planders/picture/'+vm.plander._id,
          data: {
            newProfilePicture: dataUrl
          }
        }).then(function (response) {
          $timeout(function () {
            onSuccessItem(response.data);
          });
        }, function (response) {
          if (response.status > 0) onErrorItem(response.data);
        }, function (evt) {
          vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
        });
      };

      // Called after the user has successfully uploaded a new picture
      function onSuccessItem(response) {
        // Show success message
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully changed plander picture' });

        // Populate user object
        vm.user = Authentication.user = response;

        // Reset form
        vm.fileSelected = false;
        vm.progress = 0;
      }

      // Called after the user has failed to upload a new picture
      function onErrorItem(response) {
        vm.fileSelected = false;
        vm.progress = 0;

        // Show error message
        Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> Failed to change plander picture' });
      }
    }

}());
