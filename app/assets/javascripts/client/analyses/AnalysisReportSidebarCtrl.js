(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisReportSidebarCtrl', AnalysisReportSidebarCtrl);

  AnalysisReportSidebarCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    'ConsensusService',
    'current_analysis'
  ];

  function AnalysisReportSidebarCtrl($scope, $rootScope, $state, $stateParams, ConsensusService, current_analysis) {
    var vm = this;
    vm.currentAnalysis = current_analysis;
    vm.shared = $stateParams.shared || false;
    vm.consensusId = vm.currentAnalysis.consensus && vm.currentAnalysis.consensus.id;
    vm.shareURL = $state.href(
      'inventory_analysis_shared_report',
      {inventory_id: current_analysis.inventory_id, id: current_analysis.share_token},
      {absolute: true}
    );

    ConsensusService.setContext('analysis');
    vm.exportToCSV = function() {
      $rootScope.$broadcast('building_export_file', {format: 'CSV'});
      ConsensusService
        .exportToCSV(vm.consensusId)
        .then(function () {
          $rootScope.$broadcast('stop_building_export_file');
        });
    };

    $scope.$on('top-priority', function(evt, categoryObject) {
      vm.topPriority = categoryObject.category;
      vm.topPriorityLink = categoryObject.link;
    });
  }
})();
