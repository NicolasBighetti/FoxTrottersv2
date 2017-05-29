(function () {
  'use strict';

  angular
    .module('ditus')
    .controller('DitusListController', DitusListController);

  DitusListController.$inject = ['DitusService'];

  function DitusListController(DitusService) {
    var vm = this;

    vm.ditus = DitusService.query();
  }
}());
