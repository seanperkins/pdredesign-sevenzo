(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('startAnalysis', startAnalysis);

  function startAnalysis() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/home/start_analysis.html',
      scope: {},
      controller: 'AnalysisButtonCtrl',
      controllerAs: 'analysisButton'
    }
  }
})();
