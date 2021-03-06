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
        isArray: true
      },
      'create': {
        method: 'POST'
      },
      'save': {
        method: 'PUT'
      },
      'productEntries': {
        method: 'GET',
        url: UrlService.url('inventories/:inventory_id/product_entries')
      },
      'markComplete': {
        method: 'PATCH',
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
      },
      'participantResponse': {
        method: 'GET',
        url: UrlService.url('inventories/:inventory_id/participant_response'),
        params: {
          inventory_id: '@inventory_id'
        }
      }
    };

    return $resource(UrlService.url('inventories/:inventory_id'), null, methodOptions);
  }
})();
