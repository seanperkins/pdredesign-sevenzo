(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('DataEntryCtrl', DataEntryCtrl);

  DataEntryCtrl.$inject = [
    '$scope',
    '$modal'
  ];

  function DataEntryCtrl($scope, $modal) {
    var vm = this;

    vm.showDataEntryModal = function() {
      vm.modalInstance = $modal.open({
        template: '<data-entry-modal inventory="inventory" resource="resource"></data-entry-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-data-entry-modal', function() {
      vm.modalInstance.dismiss('cancel');
    });
  }
})();
