(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('inventoryDeadlineModal', inventoryDeadlineModal);

  function inventoryDeadlineModal() {
    return {
      restrict: 'E',
      scope: {
        inventory: '='
      },
      templateUrl: 'client/inventories/inventory_deadline_modal.html',
      controller: 'InventoryDeadlineModalCtrl',
      controllerAs: 'inventoryDeadlineModal',
      replace: true
    }
  }
})();
