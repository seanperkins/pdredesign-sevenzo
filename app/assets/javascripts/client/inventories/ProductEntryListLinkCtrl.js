(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ProductEntryListLinkCtrl', ProductEntryListLinkCtrl);

  ProductEntryListLinkCtrl.$inject = [
    '$scope',
    '$modal'
  ];

  function ProductEntryListLinkCtrl($scope, $modal) {
    var vm = this;

    vm.showProductEntryListModal = function() {
      vm.modalInstance = $modal.open({
        template: '<product-entry-list-modal product-entries="productEntries" resource="resource"></product-entry-list-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-product-entry-list-modal', function() {
      vm.modalInstance.dismiss('cancel');
    });
  }
})();
