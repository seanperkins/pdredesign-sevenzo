(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('analysisLinks', analysisLinks);

  function analysisLinks() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        entity: '=',
        links: '='
      },
      templateUrl: 'client/analyses/analysis_links.html',
      controller: 'AnalysisLinksCtrl',
      controllerAs: 'analysisLinks'
    }
  }
})();