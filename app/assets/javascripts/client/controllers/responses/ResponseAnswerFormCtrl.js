(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ResponseAnswerFormCtrl', ResponseAnswerFormCtrl);

  ResponseAnswerFormCtrl.$inject = [
    'ResponseHelper'
  ];

  function ResponseAnswerFormCtrl(ResponseHelper) {
    var vm = this;

    vm.invalidEvidence = function(question) {
      return question.score.evidence === null || question.score.evidence === '';
    };

    vm.saveEvidence = function(question) {
      ResponseHelper.saveEvidence(question.score);
    };

    vm.editAnswer = function(question) {
      ResponseHelper.editAnswer(question.score);
    };
  }
})();