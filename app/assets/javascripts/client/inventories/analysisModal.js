(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('analysisModal', analysisModal);

  function analysisModal() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      templateUrl: 'client/inventories/analysis_modal.html',
      controller: 'AnalysisModalCtrl',
      controllerAs: 'analysisModal'
    }
  }
})();
