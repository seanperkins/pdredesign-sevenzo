(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryEntityStatusCtrl', InventoryEntityStatusCtrl);

  InventoryEntityStatusCtrl.$inject = [
    'EntityService'
  ];

  function InventoryEntityStatusCtrl(EntityService) {
    var vm = this;

    vm.completedInventoryIcon = EntityService.completedStatusIcon;
    vm.draftStatusIcon = EntityService.draftStatusIcon;
    vm.roundNumber = EntityService.roundNumber;
  }
})();