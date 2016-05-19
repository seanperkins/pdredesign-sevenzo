(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('analysisComparison', analysisComparison);

  function analysisComparison() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        comparisonData: '='
      },
      templateUrl: 'client/analyses/analysis_comparison.html'
    }
  }
})();