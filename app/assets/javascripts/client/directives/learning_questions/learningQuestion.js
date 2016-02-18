(function() {
  PDRClient.directive('learningQuestion', [learningQuestion]);

  function learningQuestion() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/directives/learning_questions/combined_step.html',
      transclude: true
    }
  }
})();