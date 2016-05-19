(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('analysisHighLevelTakeaway', analysisHighLevelTakeaway);

  function analysisHighLevelTakeaway() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      templateUrl: 'client/analyses/high_level_takeaways.html',
      controller: 'AnalysisHighLevelTakeawayCtrl',
      controllerAs: 'takeawayCtrl'
    }
  }
})();