(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('analysisConsensusAnswer', analysisConsensusAnswer);

  function analysisConsensusAnswer() {
    return {
      restrict: 'E',
      scope: {
        question: '=',
        productEntries: '=',
        inventoryDataEntries: '='
      },
      transclude: true,
      replace: true,
      templateUrl: 'client/inventories/analysis_consensus_answer.html',
      controller: 'AnalysisConsensusAnswerCtrl',
      controllerAs: 'analysisConsensusAnswer'
    }
  }
})();
