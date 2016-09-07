(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('consensus', consensus);

  function consensus() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          assessmentId:  '@',
          responseId:    '@',
          entity:        '=',
          consensus:     '=',
          context:       '@'
        },
        templateUrl: 'client/views/directives/consensus/consensus_questions.html',
        controller: 'ConsensusCtrl',
        controllerAs: 'vm'
    }
  }
})();
