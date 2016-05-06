(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('InventoryIndexCtrl', InventoryIndexCtrl);

  InventoryIndexCtrl.$inject = [
    '$modal',
    'SessionService',
    'inventory_result'
  ];

  function InventoryIndexCtrl($modal, SessionService, inventory_result) {
    var vm = this;

    vm.user = SessionService.getCurrentUser();
    vm.inventories = inventory_result;

    vm.openInventoryModal = function() {
      vm.modal = $modal.open({
        templateUrl: 'client/home/inventory_modal.html',
        controller: 'InventoryModalCtrl',
        controllerAs: 'inventoryModal'
      })
    };
  }
})();