(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('inventoryDataEntryModal', inventoryDataEntryModal);

  function inventoryDataEntryModal() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        inventory: '=',
        resource: '='
      },
      templateUrl: 'client/inventories/inventory_data_entry_modal.html',
      controller: 'InventoryDataEntryModalCtrl',
      controllerAs: 'inventoryDataEntryModal'
    }
  }
})();
