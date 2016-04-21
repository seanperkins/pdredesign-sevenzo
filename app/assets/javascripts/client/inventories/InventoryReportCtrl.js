(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('InventoryReportCtrl', InventoryReportCtrl);

  InventoryReportCtrl.$inject = [
    '$stateParams',
    'inventory'
  ];

  function InventoryReportCtrl($stateParams, inventory) {
    var vm = this;
    vm.inventory = inventory;
    vm.shared = $stateParams.shared || false;
  }
})();
