(function () {
  'use strict';

  angular
    .module('ditus')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Ditus',
      state: 'ditus',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'ditus', {
      title: 'List Ditus',
      state: 'ditus.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'ditus', {
      title: 'Create Ditu',
      state: 'ditus.create',
      roles: ['user']
    });
  }
}());
