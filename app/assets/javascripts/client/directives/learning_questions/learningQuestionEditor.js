(function () {
  angular.module('PDRClient')
      .directive('learningQuestionEditor', learningQuestionEditor);

  function learningQuestionEditor() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/directives/learning_questions/edit.html',
      scope: {
        question: '=',
        editable: '='
      },
      replace: true,
      transclude: true,
      controller: ['$scope', LearningQuestionEditorCtrl],
      controllerAs: 'learningQuestionEditor'
    }
  }

  function LearningQuestionEditorCtrl($scope) {
    var vm = this;
    vm.currentQuestion = $scope.question;
    vm.questionEditable = $scope.editable;
  }
})();