(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('InventoryMessage', InventoryMessage);

  InventoryMessage.$inject = [
    '$resource',
    'UrlService'
  ];

  function InventoryMessage($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/messages'));
  }
})();
