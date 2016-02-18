(function () {
  PDRClient.directive('learningQuestionDisplay', learningQuestionDisplay);

  function learningQuestionDisplay() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/directives/learning_questions/display.html',
      replace: true,
      transclude: true,
      controller: ['$stateParams', 'LearningQuestion', LearningQuestionDisplayCtrl],
      controllerAs: 'learningQuestionDisplay'
    }
  }

  function LearningQuestionDisplayCtrl($stateParams, LearningQuestion) {
    var vm = this;
    vm.learningQuestions = [];
    vm.editorOpened = false;

    LearningQuestion
        .get({assessment_id: $stateParams.id})
        .$promise
        .then(function (result) {
          vm.learningQuestions = result.learning_questions;
        });

    vm.toggleEditor = function() {
      vm.editorOpened = !vm.editorOpened;
    }
  }
})();