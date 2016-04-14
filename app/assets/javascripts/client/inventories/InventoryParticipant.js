(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('InventoryParticipant', InventoryParticipant);

  InventoryParticipant.$inject = [
    '$resource',
    'UrlService'
  ];

  function InventoryParticipant($resource, UrlService) {
    var methodOptions = {
      all: {
        method: 'GET',
        isArray: true,
        url: UrlService.url('inventories/:inventory_id/participants/all')
      },
      create: {
        method: 'POST'
      },
      delete: {
        method: 'DELETE',
        url: UrlService.url('inventories/:inventory_id/participants/:id')
      }
    };
    return $resource(UrlService.url('inventories/:inventory_id/participants'), null, methodOptions);
  }
})();
