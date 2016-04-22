(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('InventoryReportSidebarCtrl', InventoryReportSidebarCtrl);

  InventoryReportSidebarCtrl.$inject = [
    '$scope',
    '$modal',
    'inventory',
    '$stateParams'
  ];

  function InventoryReportSidebarCtrl($scope, $modal, inventory, $stateParams) {
    var vm = this;
    $scope.inventory = inventory;
    vm.inventory = $scope.inventory;
    vm.shared = $stateParams.shared || false;
    vm.downloadReport = function() {
      vm.downloadModal = $modal.open({
        templateUrl: 'client/inventories/inventory_report_download_modal.html',
        scope: $scope
      });
    };

    vm.closeDownloadReportModal = function() {
      vm.downloadModal.dismiss();
    };
    $scope.$on('inventory-report-downloaded', function() {
      vm.closeDownloadReportModal();
    });
  }
})();
