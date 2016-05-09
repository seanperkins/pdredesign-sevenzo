(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('InventoryEditCtrl', InventoryEditCtrl);

  InventoryEditCtrl.$inject = [
    '$timeout',
    '$state',
    '$stateParams',
    'inventory',
    'currentParticipant'
  ];

  function InventoryEditCtrl($timeout, $state, $stateParams, inventory, currentParticipant) {
    var vm = this;

    $timeout(function() {
      if(currentParticipant.hasResponded === true) {
        $state.transitionTo('inventory_dashboard', {
          inventory_id: $stateParams.inventory_id
        });
      }
    });

    vm.inventory = inventory;
  }
})();
