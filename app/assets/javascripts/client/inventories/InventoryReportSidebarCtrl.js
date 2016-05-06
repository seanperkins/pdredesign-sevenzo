(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('InventoryReportSidebarCtrl', InventoryReportSidebarCtrl);

  InventoryReportSidebarCtrl.$inject = [
    '$scope',
    '$modal',
    'inventory',
    '$stateParams',
    '$state'
  ];

  function InventoryReportSidebarCtrl($scope, $modal, inventory, $stateParams, $state) {
    var vm = this;
    vm.inventory = inventory;
    vm.shared = $stateParams.shared || false;
    vm.hideAnalysisAccess = inventory.analysis_count === 0 && !vm.inventory.is_facilitator;
    vm.creatingAnalysis = vm.inventory.analysis_count === 0 && vm.inventory.is_facilitator;

    vm.createAnalysis = function() {
      vm.analysisModal = $modal.open({
        templateUrl: 'client/analyses/analysis_modal.html',
        controller: 'AnalysisModalCtrl',
        controllerAs: 'analysisModal',
        resolve: {
          preSelectedInventory: function() {
            return vm.inventory;
          }
        }
      });
    };

    vm.gotoAnalysis = function() {
      if (vm.inventory.analysis_count === 1) {
        var analysisState = !vm.inventory.analysis.assigned_at ? 'inventory_analysis_assign' : 'analysis_dashboard';
        $state.go(analysisState, {
          inventory_id: vm.inventory.id,
          id: vm.inventory.analysis.id
        });
      } else {
        $state.go('analyses');
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
  }
})();
