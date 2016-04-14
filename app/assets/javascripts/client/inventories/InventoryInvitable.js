(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('InventoryInvitable', InventoryInvitable);

  InventoryInvitable.$inject = [
    '$resource',
    'UrlService'
  ];

  function InventoryInvitable($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/invitables'), null, {
      list: {
        method: 'GET',
        isArray: true,
        params: {
          inventory_id: '@inventory_id'
        }
      }
    });
  }
})();
