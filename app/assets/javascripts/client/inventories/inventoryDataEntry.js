(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('inventoryDataEntry', inventoryDataEntry);

  function inventoryDataEntry() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/inventories/inventory_data_entry.html',
      scope: {
        inventory: '=',
        resource: '='
      },
      controller: 'InventoryDataEntryCtrl',
      controllerAs: 'inventoryDataEntry'
    }
  }
})();
