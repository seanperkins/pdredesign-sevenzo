(function () {
  angular.module('PDRClient')
      .directive('learningQuestionDisplay', learningQuestionDisplay);

  function learningQuestionDisplay() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/directives/learning_questions/display.html',
      replace: true,
      transclude: true,
      controller: ['$stateParams', '$scope', 'LearningQuestion', LearningQuestionDisplayCtrl],
      controllerAs: 'learningQuestionDisplay'
    }
  }

  function LearningQuestionDisplayCtrl($stateParams, $scope, LearningQuestion) {
    var vm = this;
    vm.learningQuestions = [];

    vm.loadQuestions = function () {
      LearningQuestion
          .get({assessment_id: $stateParams.id})
          .$promise
          .then(function (result) {
            vm.learningQuestions = result.learning_questions;
          });
    };

    $scope.$on('new-learning-question', function () {
      vm.loadQuestions();
    });

    vm.loadQuestions();
  }
})();