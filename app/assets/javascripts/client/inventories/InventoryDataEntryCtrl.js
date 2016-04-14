(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryDataEntryCtrl', InventoryDataEntryCtrl);

  InventoryDataEntryCtrl.$inject = [
    '$scope',
    '$modal'
  ];

  function InventoryDataEntryCtrl($scope, $modal) {
    var vm = this;

    vm.showInventoryDataEntryModal = function() {
      vm.modalInstance = $modal.open({
        template: '<inventory-data-entry-modal inventory="inventory" resource="resource"></inventory-data-entry-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-inventory-data-entry-modal', function() {
      vm.modalInstance.dismiss('cancel');
    });
  }
})();
