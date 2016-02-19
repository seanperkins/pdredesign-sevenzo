(function () {
  angular.module('PDRClient')
      .directive('learningQuestionForm', learningQuestionForm);

  function learningQuestionForm() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/directives/learning_questions/form.html',
      replace: true,
      controller: ['$stateParams', '$scope', 'LearningQuestion', LearningQuestionFormCtrl],
      controllerAs: 'learningQuestionForm',
      transclude: true
    }
  }

  function LearningQuestionFormCtrl($stateParams, $scope, LearningQuestion) {
    var vm = this;
    vm.newEntity = {
      'body': ''
    };
    vm.status = '';

    vm.clearInputForm = function(model) {
      model.body = '';
    };

    vm.createLearningQuestion = function(model) {
      LearningQuestion
          .create({assessment_id: $stateParams.id}, {learning_question: {body: model.body}})
          .$promise
          .then(function(result) {
            vm.status = result;
            $scope.$emit('new-learning-question');
            vm.clearInputForm(model);
          });
    }
  }
})();