(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('learningQuestionListDisplay', learningQuestionListDisplay);

  function learningQuestionListDisplay() {
    return {
      restrict: 'E',
      templateUrl: 'client/learning_questions/list.html',
      replace: true,
      transclude: true,
      scope: {
        'context': '@'
      },
      controller: 'LearningQuestionListDisplayCtrl',
      controllerAs: 'learningQuestionListDisplay'
    };
  }
})();