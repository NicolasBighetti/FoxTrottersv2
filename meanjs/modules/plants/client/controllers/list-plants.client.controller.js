(function () {
  'use strict';

  angular
    .module('plants')
    .controller('PlantsListController', PlantsListController);

  PlantsListController.$inject = ['PlantsService'];

  function PlantsListController(PlantsService) {
    var vm = this;

    vm.plants = PlantsService.query();
  }
}());
