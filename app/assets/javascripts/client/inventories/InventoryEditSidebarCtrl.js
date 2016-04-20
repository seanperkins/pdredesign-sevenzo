(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryEditSidebarCtrl', InventoryEditSidebarCtrl);

  InventoryEditSidebarCtrl.$inject = [
    '$modal',
    '$scope',
    '$stateParams',
    '$window',
    '$state',
    'Inventory'
  ];

  function InventoryEditSidebarCtrl($modal, $scope, $stateParams, $window, $state, Inventory) {
    var vm = this;

    vm.displayLearningQuestions = function() {
      vm.modal = $modal.open({
        template: '<learning-question-modal context="inventory" reminder="false"></learning-question-modal>',
        scope: $scope
      });
    };

    vm.markInventoryComplete = function() {
      var shouldContinue = $window.confirm('Are you sure you wish to mark this inventory as complete?  You will not be able to add any more items to this inventory.');

      if (shouldContinue) {
        Inventory.markComplete({inventory_id: $stateParams.inventory_id})
            .$promise
            .then(function() {
              $state.transitionTo('inventories_report', {
                inventory_id: $stateParams.inventory_id
              });
            });
      }
    };

    vm.saveInventoryResponse = function() {
      Inventory.saveResponse({inventory_id: $stateParams.inventory_id})
          .$promise
          .then(function() {
            $state.transitionTo('inventory_dashboard', {
              inventory_id: $stateParams.inventory_id
            });
          });
    };

    $scope.$on('close-learning-question-modal', function() {
      vm.modal.dismiss('cancel');
    });

  }
})();