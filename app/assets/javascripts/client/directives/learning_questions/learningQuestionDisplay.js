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

    vm.deleteLearningQuestion = function (learningQuestion) {
      LearningQuestion
          .delete({assessment_id: $stateParams.id, id: learningQuestion.id})
          .$promise
          .then(function (result) {
            console.log(result);
            $scope.$emit('learning-question-change');
          }).catch(function (result) {
            console.log(result.data.errors);
            $scope.$emit('learning-question-change');
          });
    };

    $scope.$on('learning-question-change', function () {
      vm.loadQuestions();
    });

    vm.loadQuestions();
  }
})();