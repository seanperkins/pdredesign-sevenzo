(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('analysisSchedule', analysisSchedule);

  function analysisSchedule() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        analysis: '=',
        onlySchedule: '='
      },
      templateUrl: 'client/inventories/analysis_schedule.html',      
      controller: 'AnalysisScheduleCtrl',
      controllerAs: 'analysisSchedule'
    }
  }
})();
