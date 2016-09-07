(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('questionContainer', questionContainer);

  function questionContainer() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        category: '=',
        isConsensus: '@',
        scores: '=',
        questionType: '@',
        productEntries: '=',
        dataEntries: '='
      },
      templateUrl: 'client/consensus/question_container.html',
      controller: 'QuestionContainerCtrl',
      controllerAs: 'vm'
    }
  }
})();