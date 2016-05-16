(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('analysisEntityStatus', analysisEntityStatus);

  function analysisEntityStatus() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        entity: '='
      },
      templateUrl: 'client/analyses/entity_status.html',
      controller: 'AnalysisEntityStatusCtrl',
      controllerAs: 'entityStatus'
    }
  }
})();