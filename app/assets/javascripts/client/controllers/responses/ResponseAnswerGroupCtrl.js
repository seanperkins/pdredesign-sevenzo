(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ResponseAnswerGroupCtrl', ResponseAnswerGroupCtrl);

  ResponseAnswerGroupCtrl.$inject = [
    '$stateParams',
    '$scope',
    'ResponseHelper',
    'ResponseValidationService'
  ];

  function ResponseAnswerGroupCtrl($stateParams, $scope, ResponseHelper, ResponseValidationService) {
    var vm = this;

    vm.responseId = $stateParams.response_id;
    vm.assessmentId = $stateParams.assessment_id;

    $scope.responseId = vm.responseId;
    $scope.assessmentId = vm.assessmentId;

    vm.assignAnswerToQuestion = function(answer, question) {
      if (ResponseValidationService.invalidEvidence(question)){
        return;
      }
      question.skipped = false;
      question.score.value = answer.value;
      ResponseHelper.assignAnswerToQuestion($scope, answer, question);
    };
  }
})();