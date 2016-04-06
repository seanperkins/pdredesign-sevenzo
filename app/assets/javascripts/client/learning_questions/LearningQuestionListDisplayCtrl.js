(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('LearningQuestionListDisplayCtrl', LearningQuestionListDisplayCtrl);

  LearningQuestionListDisplayCtrl.$inject = [
    '$scope',
    '$window',
    'LearningQuestionService'
  ];

  function LearningQuestionListDisplayCtrl($scope, $window, LearningQuestionService) {
    var vm = this;

    vm.learningQuestions = [];
    LearningQuestionService.setContext($scope.context);
    LearningQuestionService.loadQuestions();

    vm.deleteLearningQuestion = function(model) {
      if (model.editable) {
        var willDelete = $window.confirm('Are you sure you wish to delete this learning question?');
        if (willDelete) {
          LearningQuestionService.deleteLearningQuestion(model)
              .then(function() {
                LearningQuestionService.loadQuestions();
              });
        }
      }
    };

    vm.updateLearningQuestion = function(model) {
      if (model.editable) {
        LearningQuestionService.updateLearningQuestion(model)
            .finally(function() {
              LearningQuestionService.loadQuestions();
            });
      }
    };

    vm.validate = function(data) {
      return LearningQuestionService.validate(data);
    };

    $scope.$on('learning-questions-updated', function(event, value) {
      vm.learningQuestions = value.learning_questions;
    });
  }
})();