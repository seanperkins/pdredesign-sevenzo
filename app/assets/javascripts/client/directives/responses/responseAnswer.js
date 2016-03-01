(function() {
  'use strict';
  angular.module('PDRClient')
      .directive('responseAnswer', responseAnswer);

  function responseAnswer() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        question: '=',
        answer: '='
      },
      replace: true,
      templateUrl: 'client/views/directives/responses/answer.html',
      controller: 'ResponseAnswerCtrl',
      controllerAs: 'responseAnswer'
    }
  }
})();