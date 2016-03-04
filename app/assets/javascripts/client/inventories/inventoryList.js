(function() {
  'use strict';
  angular.module('PDRClient')
      .directive('inventoryList', inventoryList);

  function inventoryList() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        inventories: '='
      },
      templateUrl: 'client/inventories/inventory_list.html',
      controller: 'InventoryListCtrl',
      controllerAs: 'inventoryList'
    }
  }
})();