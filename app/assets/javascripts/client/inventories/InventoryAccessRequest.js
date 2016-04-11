(function() {
  'use strict';

  angular.module('PDRClient').factory('InventoryAccessRequest', InventoryAccessRequest);

  InventoryAccessRequest.$inject = [
    '$resource',
    'UrlService'
  ];

  function InventoryAccessRequest($resource, UrlService) {
    var options = {
      list: {
        method: 'GET',
        isArray: true
      },
      update: {
        method: 'PATCH',
        url: UrlService.url('inventories/:inventory_id/access_requests/:id')
      }
    };
    return $resource(UrlService.url('inventories/:inventory_id/access_requests'), null, options);
  }
})();
