(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('QuestionContainerCtrl', QuestionContainerCtrl);

  QuestionContainerCtrl.$inject = [
    'ResponseHelper'
  ];

  function QuestionContainerCtrl(ResponseHelper) {
    var vm = this;

    vm.questionColor = ResponseHelper.questionColor;

    vm.toggleAnswers = function (question, $event) {
      $scope.$broadcast('question-toggled', question.id);
      ResponseHelper.toggleAnswers(question, $event);
    };
  }
})();
