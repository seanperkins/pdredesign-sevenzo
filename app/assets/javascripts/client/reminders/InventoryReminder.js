(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('InventoryReminder', InventoryReminder);

  InventoryReminder.$inject = [
    '$resource',
    'UrlService'
  ];

  function InventoryReminder($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/reminders'));
  }
})();
