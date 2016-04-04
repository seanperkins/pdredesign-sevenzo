(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryAssignCtrl', InventoryAssignCtrl);

  InventoryAssignCtrl.$inject = [
    'current_inventory'
  ];

  function InventoryAssignCtrl(current_inventory) {
    var vm = this;
    vm.currentInventory = current_inventory;
  }

})();