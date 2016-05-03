(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryDeadlineModalCtrl', InventoryDeadlineModalCtrl);

  InventoryDeadlineModalCtrl.$inject = [
    '$scope',
    '$timeout',
    'Inventory'
  ];

  function InventoryDeadlineModalCtrl($scope, $timeout, Inventory) {
    var vm = this;
    vm.inventory = $scope.inventory;
    vm.closeModal = function() {
      $scope.$emit('close-deadline-modal');
    }

    $timeout(function() {
      if($scope.inventory.due_date != null) {
        $scope.modal_due_date = moment($scope.inventory.due_date).format("MM/DD/YYYY");
      }

      $('.datetime').datetimepicker({pickTime: false});
    });

    $scope.updateInventory = function() {
      vm.inventory.deadline = moment($('#due-date').val(), 'MM/DD/YYYY').toISOString();

      Inventory.save({inventory_id: vm.inventory.id}, {inventory: vm.inventory}).$promise.then(function(){
        vm.closeModal();
      });
    };
  }
})();
