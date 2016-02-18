(function () {
  PDRClient.directive('learningQuestionForm', learningQuestionForm);

  function learningQuestionForm() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/views/directives/learning_questions/form.html',
      transclude: true

    }
  }
})();