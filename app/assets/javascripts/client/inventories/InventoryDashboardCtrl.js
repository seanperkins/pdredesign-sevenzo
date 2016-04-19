(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryDashboardCtrl', InventoryDashboardCtrl);

  InventoryDashboardCtrl.$inject = [
    '$modal',
    '$scope',
    'CreateService',
    'inventory'
  ];

  function InventoryDashboardCtrl($modal, $scope, CreateService, inventory) {
    var vm = this;

    CreateService.setContext('inventory');
    vm.inventory = inventory;
    vm.participants = CreateService.loadParticipants();

    vm.createReminder = function() {
      vm.modal = $modal.open({
        template: '<reminder-modal context="inventory"></reminder-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-reminder-modal', function() {
      vm.modal.dismiss('cancel');
    });
  }
})();