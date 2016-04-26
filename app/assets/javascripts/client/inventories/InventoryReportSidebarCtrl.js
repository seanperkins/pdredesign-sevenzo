(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('InventoryReportSidebarCtrl', InventoryReportSidebarCtrl);

  InventoryReportSidebarCtrl.$inject = [
    '$scope',
    '$modal',
    'inventory',
    '$stateParams',
    'SessionService'
  ];

  function InventoryReportSidebarCtrl($scope, $modal, inventory, $stateParams, SessionService) {
    var vm = this;
    $scope.inventory = inventory;
    vm.inventory = $scope.inventory;
    vm.shared = $stateParams.shared || false;
    var user = SessionService.getCurrentUser();
    vm.hideAnalysisAccess = inventory.analysis_count == 0 && user.role == 'participant';
    vm.gotoAnalysis = function() {
      if(vm.inventory.analysis_count == 0) {
        vm.analysisModal = $modal.open({
          template: '<analysis-modal inventory="inventory"></analysis-modal>',
          scope: $scope
        });
      }
    };
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
    $scope.$on('close-analysis-modal', function() {
      vm.analysisModal.dismiss();
    });
  }
})();
