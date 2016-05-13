(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('inventoryDataEntryListModal', inventoryDataEntryListModal);

  function inventoryDataEntryListModal() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        inventoryDataEntries: '=',
        resource: '='
      },
      templateUrl: 'client/inventories/inventory_data_entry_list_modal.html',
      controller: 'InventoryDataEntryListModalCtrl',
      controllerAs: 'inventoryDataEntryListModal'
    }
  }
})();
