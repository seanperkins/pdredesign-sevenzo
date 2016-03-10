(function() {
  'use strict';
  angular.module('PDRClient')
      .directive('inventoryItem', inventoryItem);

  function inventoryItem() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        element: '='
      },
      templateUrl: 'client/inventories/inventory_item.html',
      controller: 'InventoryItemCtrl',
      controllerAs: 'inventoryItem'
    }
  }
})();