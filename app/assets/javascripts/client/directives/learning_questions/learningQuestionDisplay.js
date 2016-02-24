(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('learningQuestionDisplay', learningQuestionDisplay);

  function learningQuestionDisplay() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/directives/learning_questions/display.html',
      replace: true,
      transclude: true,
      controller: 'LearningQuestionDisplayCtrl',
      controllerAs: 'learningQuestionDisplay'
    }
  }
})();