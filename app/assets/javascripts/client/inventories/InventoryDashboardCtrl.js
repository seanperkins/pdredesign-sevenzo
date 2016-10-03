(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryDashboardCtrl', InventoryDashboardCtrl);

  InventoryDashboardCtrl.$inject = [
    '$modal',
    '$scope',
    'CreateService',
    'inventory',
    'inventoryMessages',
    'inventoryParticipants'
  ];

  function InventoryDashboardCtrl($modal, $scope, CreateService, inventory, inventoryMessages, inventoryParticipants) {
    var vm = this;

    CreateService.setContext('inventory');
    vm.inventory = inventory;
    vm.participants = inventoryParticipants;
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
      vm.participants = CreateService.loadParticipants();
    });
  }
})();