(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('Inventory', Inventory);

  Inventory.$inject = [
    '$resource',
    'UrlService'
  ];

  function Inventory($resource, UrlService) {
    var methodOptions = {
      'query': {
        method: 'GET',
        isArray: false
      },
      'create': {
        method: 'POST'
      },
      'save': {
        method: 'PUT'
      },
      'districtProductEntries': {
        method: 'GET',
        url: UrlService.url('inventories/:inventory_id/district_product_entries')
      }
    };

    return $resource(UrlService.url('inventories/:inventory_id'), null, methodOptions);
  }
})();
