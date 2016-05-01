(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('inventoryDataEntryListLink', inventoryDataEntryListLink);

  function inventoryDataEntryListLink() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/inventories/inventory_data_entry_list_link.html',
      scope: {
        inventoryDataEntries: '=',
        resource: '='
      },
      controller: 'InventoryDataEntryListLinkCtrl',
      controllerAs: 'inventoryDataEntryListLink'
    }
  }
})();
