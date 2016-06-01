(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisReportSidebarCtrl', AnalysisReportSidebarCtrl);

  AnalysisReportSidebarCtrl.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    'current_analysis'
  ];

  function AnalysisReportSidebarCtrl($scope, $state, $stateParams, current_analysis) {
    var vm = this;
    vm.currentAnalysis = current_analysis;
    vm.shared = $stateParams.shared || false;
    vm.shareURL = $state.href(
      'inventory_analysis_shared_report',
      {inventory_id: current_analysis.inventory_id, id: current_analysis.share_token},
      {absolute: true}
    );
    vm.returnState = {
      inventory_id: $stateParams.inventory_id,
      id: $stateParams.id
    };

    $scope.$on('top-priority', function(evt, categoryObject) {
      vm.topPriority = categoryObject.category;
      vm.topPriorityLink = categoryObject.link;
    });
  }
})();
