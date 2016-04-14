(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('learningQuestion', learningQuestion);

  function learningQuestion() {
    return {
      restrict: 'E',
      scope: {
        'modal': '@',
        'context': '@'
      },
      templateUrl: 'client/learning_questions/display.html',
      replace: true,
      transclude: true
    }
  }
})();
