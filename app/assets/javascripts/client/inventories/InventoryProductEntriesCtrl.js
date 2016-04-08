(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('InventoryProductEntriesCtrl', InventoryProductEntriesCtrl);

  InventoryProductEntriesCtrl.$inject = [
    '$scope',
    'InventoryProductEntry',
    'DTOptionsBuilder',
    'DTColumnBuilder'
  ];

  function InventoryProductEntriesCtrl($scope, InventoryProductEntry, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
      return InventoryProductEntry.query({inventory_id: $scope.inventoryId}).$promise;
    }).withPaginationType('full_numbers');
    vm.dtColumns = [
      DTColumnBuilder.newColumn('id').withTitle('ID'),
      DTColumnBuilder.newColumn('first_name').withTitle('First name'),
      DTColumnBuilder.newColumn('last_name').withTitle('Last name').notVisible()
    ];
  }
})();
