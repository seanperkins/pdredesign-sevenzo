(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('analysisButton', analysisButton);

  function analysisButton() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/inventories/analysis_button.html',
      scope: {},
      controller: 'AnalysisButtonCtrl',
      controllerAs: 'analysisButton'
    }
  }
})();
