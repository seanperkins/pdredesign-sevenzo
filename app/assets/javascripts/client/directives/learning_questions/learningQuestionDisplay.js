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
      controller: ['$stateParams', '$scope', '$window', 'LearningQuestion', LearningQuestionDisplayCtrl],
      controllerAs: 'learningQuestionDisplay'
    }
  }

  function LearningQuestionDisplayCtrl($stateParams, $scope, $window, LearningQuestion) {
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

    vm.deleteLearningQuestion = function (model) {
      var willDelete = $window.confirm('Are you sure you wish to delete this learning question?');
      if (willDelete) {
        LearningQuestion
            .delete({assessment_id: $stateParams.id, id: model.id})
            .$promise
            .then(function () {
              $scope.$emit('learning-question-change');
            });
      }
    };

    vm.updateLearningQuestion = function (model) {
      if (model.editable) {
        LearningQuestion
            .update({assessment_id: $stateParams.id, id: model.id, learning_question: {body: model.body}})
            .$promise
            .then(function () {
              $scope.$emit('learning-question-change');
            }).catch(function () {
          $scope.$emit('learning-question-change');
        });
      }
    };

    $scope.$on('learning-question-change', function () {
      vm.loadQuestions();
    });

    vm.loadQuestions();
  }
})();