(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('LearningQuestionFormCtrl', LearningQuestionFormCtrl);

  LearningQuestionFormCtrl.$inject = [
    '$stateParams',
    '$scope',
    'LearningQuestion'
  ];

  function LearningQuestionFormCtrl($stateParams, $scope, LearningQuestion) {
    var vm = this;
    vm.newEntity = {
      'body': ''
    };

    vm.extractId = function() {
      return $stateParams.assessment_id || $stateParams.id;
    };

    vm.clearInputForm = function(model) {
      model.body = '';
    };

    vm.createLearningQuestion = function(model) {
      LearningQuestion
          .create({assessment_id: vm.extractId()}, {learning_question: {body: model.body}})
          .$promise
          .then(function() {
            $scope.$emit('learning-question-change');
            vm.clearInputForm(model);
          });
    }
  }
})();