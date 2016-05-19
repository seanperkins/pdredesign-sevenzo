(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryDataEntryListLinkCtrl', InventoryDataEntryListLinkCtrl);

  InventoryDataEntryListLinkCtrl.$inject = [
    '$scope',
    '$modal'
  ];

  function InventoryDataEntryListLinkCtrl($scope, $modal) {
    var vm = this;

    vm.showInventoryDataEntryListModal = function() {
      vm.modalInstance = $modal.open({
        template: '<inventory-data-entry-list-modal inventory-data-entries="inventoryDataEntries" resource="resource"></inventory-data-entry-list-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-inventory-data-entry-list-modal', function() {
      vm.modalInstance.dismiss('cancel');
    });
  }
})();
