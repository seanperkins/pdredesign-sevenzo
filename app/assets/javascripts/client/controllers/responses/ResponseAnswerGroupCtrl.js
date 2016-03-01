(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ResponseAnswerGroupCtrl', ResponseAnswerGroupCtrl);

  ResponseAnswerGroupCtrl.$inject = [
    '$stateParams',
    'ResponseHelper'
  ];

  function ResponseAnswerGroupCtrl($stateParams, ResponseHelper) {
    var vm = this;

    vm.responseId = $stateParams.response_id;
    vm.assessmentId = $stateParams.assessment_id;

    vm.assignAnswerToQuestion = function(answer, question) {
      ResponseHelper.assignAnswerToQuestion(vm, answer, question);
    };
  }
})();