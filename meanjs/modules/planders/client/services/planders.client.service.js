// Planders service used to communicate Planders REST endpoints
(function () {
  'use strict';

  angular
    .module('planders')
    .factory('PlandersService', PlandersService);

  PlandersService.$inject = ['$resource'];

  function PlandersService($resource) {
    return $resource('/api/planders/:planderId', {
      planderId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
