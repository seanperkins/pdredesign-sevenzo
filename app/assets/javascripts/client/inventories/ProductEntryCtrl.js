(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ProductEntryCtrl', ProductEntryCtrl);

  ProductEntryCtrl.$inject = [
    '$scope',
    '$modal'
  ];

  function ProductEntryCtrl($scope, $modal) {
    var vm = this;

    vm.showProductEntryModal = function() {
      vm.modalInstance = $modal.open({
        template: '<product-entry-modal inventory="inventory" resource="resource"></product-entry-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-product-entry-modal', function() {
      vm.modalInstance.dismiss('cancel');
    });
  }
})();
