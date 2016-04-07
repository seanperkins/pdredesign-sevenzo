(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('InventoryEditCtrl', InventoryEditCtrl);

  InventoryEditCtrl.$inject = [
    'inventory',
    'DTOptionsBuilder',
    'DTColumnBuilder'
  ];

  function InventoryEditCtrl(inventory, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.inventory = inventory;
    vm.dtOptions = DTOptionsBuilder.fromSource('/v1/inventories/1/permissions').withPaginationType('full_numbers');
    vm.dtColumns = [
      DTColumnBuilder.newColumn('id').withTitle('ID'),
      DTColumnBuilder.newColumn('first_name').withTitle('First name'),
      DTColumnBuilder.newColumn('last_name').withTitle('Last name').notVisible()
    ];
  }
})();
