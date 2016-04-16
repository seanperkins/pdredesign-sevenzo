(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryDashboardCtrl', InventoryDashboardCtrl);

  InventoryDashboardCtrl.$inject = [
    'CreateService',
    'inventory'
  ];

  function InventoryDashboardCtrl(CreateService, inventory) {
    var vm = this;

    CreateService.setContext('inventory');
    vm.inventory = inventory;
    vm.participants = CreateService.loadParticipants();
  }
})();