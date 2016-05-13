(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('analysisDeadlineModal', analysisDeadlineModal);

  function analysisDeadlineModal() {
    return {
      restrict: 'E',
      scope: {
        analysis: '='
      },
      templateUrl: 'client/inventories/analysis_deadline_modal.html',
      controller: 'AnalysisDeadlineModalCtrl',
      controllerAs: 'analysisDeadlineModal',
      replace: true
    }
  }
})();
