(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('consensus', consensus);

  function consensus() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        consensus: '=',
        questionType: '@'
      },
      templateUrl: 'client/consensus/consensus_main.html',
      controller: 'ConsensusCtrl',
      controllerAs: 'vm'
    }
  }
})();
