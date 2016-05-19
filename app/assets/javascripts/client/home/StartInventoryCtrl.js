(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('StartInventoryCtrl', StartInventoryCtrl);

  StartInventoryCtrl.$inject = [
    '$modal',
    'RecommendationTextService'
  ];

  function StartInventoryCtrl($modal, RecommendationTextService) {
    var vm = this;

    vm.text = function() {
      return RecommendationTextService.inventoryText();
    };

    vm.openInventoryModal = function() {
      vm.modal = $modal.open({
        templateUrl: 'client/home/inventory_modal.html',
        controller: 'InventoryModalCtrl',
        controllerAs: 'inventoryModal'
      })
    };
  }
})();