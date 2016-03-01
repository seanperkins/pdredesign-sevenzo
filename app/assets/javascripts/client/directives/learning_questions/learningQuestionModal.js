(function() {
  'use strict';
  angular.module('PDRClient')
      .directive('learningQuestionModal', learningQuestionModal);

  function learningQuestionModal() {
    return {
      restrict: 'E',
      scope: {
        reminder: '@'
      },
      templateUrl: 'client/views/modals/learning_questions/add_learning_question.html',
      link: function(scope) {
        // The modal exists on the parent scope, so we have to reach up to it  to bind any closing actions on the modal.
        var parentScope = scope.$parent;
        scope.closeModal = function() {
          parentScope.modal.dismiss('cancel');
        }
      },
      replace: true,
      transclude: true
    }
  }
})();
