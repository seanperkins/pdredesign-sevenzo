(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('InventoryIndexCtrl', InventoryIndexCtrl);

  InventoryIndexCtrl.$inject = [
    'SessionService',
    'inventories'
  ];

  function InventoryIndexCtrl(SessionService, inventories) {
    var vm = this;

    vm.user = SessionService.getCurrentUser();
    vm.inventories = inventories;

  }
})();