(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('learningQuestionForm', learningQuestionForm);

  function learningQuestionForm() {
    return {
      restrict: 'E',
      templateUrl: 'client/learning_questions/form.html',
      replace: true,
      scope: {
        context: '@'
      },
      controller: 'LearningQuestionFormCtrl',
      controllerAs: 'learningQuestionForm',
      transclude: true
    };
  }
})();