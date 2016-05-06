(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('StartInventoryCtrl', StartInventoryCtrl);

  StartInventoryCtrl.$inject = [
    '$modal'
  ];

  function StartInventoryCtrl($modal) {
    var vm = this;

    vm.openInventoryModal = function() {
      vm.modal = $modal.open({
        templateUrl: 'client/home/inventory_modal.html',
        controller: 'InventoryModalCtrl',
        controllerAs: 'inventoryModal'
      })
    };
  }
})();