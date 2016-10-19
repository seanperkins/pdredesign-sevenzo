(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryDashboardCtrl', InventoryDashboardCtrl);

  InventoryDashboardCtrl.$inject = [
    '$modal',
    '$scope',
    'ToolMemberService',
    'inventory',
    'inventoryMessages'
  ];

  function InventoryDashboardCtrl($modal, $scope, ToolMemberService, inventory, inventoryMessages) {
    var vm = this;

    ToolMemberService.setContext('inventory');
    vm.inventory = inventory;
    vm.members = ToolMemberService.loadParticipants();
    vm.messages = inventoryMessages.messages;

    vm.createReminder = function() {
      vm.modal = $modal.open({
        template: '<reminder-modal context="inventory"></reminder-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-reminder-modal', function() {
      vm.modal.dismiss('cancel');
    });

    $scope.$on('update_participants', function() {
      vm.members = ToolMemberService.loadParticipants();
    });
  }
})();