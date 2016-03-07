(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('inventoryModal', inventoryModal);

  function inventoryModal() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {},
      templateUrl: 'client/home/inventory_modal.html',
      controller: 'InventoryModalCtrl',
      controllerAs: 'inventoryModal'
    }
  }
})();