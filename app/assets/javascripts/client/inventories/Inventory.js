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
      },
      'markComplete': {
        method: 'POST',
        url: UrlService.url('inventories/:inventory_id/mark_complete'),
        params: {
          inventory_id: '@inventory_id'
        }
      },
      'saveResponse': {
        method: 'POST',
        url: UrlService.url('inventories/:inventory_id/save_response'),
        params: {
          inventory_id: '@inventory_id'
        }
      }
    };

    return $resource(UrlService.url('inventories/:inventory_id'), null, methodOptions);
  }
})();
