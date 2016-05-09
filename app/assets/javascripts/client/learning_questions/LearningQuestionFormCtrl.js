(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('LearningQuestionFormCtrl', LearningQuestionFormCtrl);

  LearningQuestionFormCtrl.$inject = [
    '$scope',
    'LearningQuestionService'
  ];

  function LearningQuestionFormCtrl($scope, LearningQuestionService) {
    var vm = this;
    vm.error = '';
    vm.newEntity = {
      'body': ''
    };

    LearningQuestionService.setContext($scope.context);

    vm.clearInputForm = function(model) {
      model.body = '';
    };

    vm.createLearningQuestion = function(model) {
      var validationMsg = vm.validate(model.body);
      if (validationMsg) {
        vm.error = validationMsg;
        $scope.learningQuestionForm.$invalid = true;
      } else {
        $scope.learningQuestionForm.$invalid = false;
        LearningQuestionService.createLearningQuestion(model)
            .then(function() {
              LearningQuestionService.loadQuestions();
              vm.clearInputForm(model);
            });
      }
    };

    vm.validate = function(data) {
      return LearningQuestionService.validate(data);
    }
  }
})();