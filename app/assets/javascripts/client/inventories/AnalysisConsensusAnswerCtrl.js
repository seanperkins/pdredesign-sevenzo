(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisConsensusAnswerCtrl', AnalysisConsensusAnswerCtrl);

  AnalysisConsensusAnswerCtrl.$inject = [
    '$stateParams',
    '$scope',
    'ResponseHelper',
    'ResponseValidationService',
    'AnalysisConsensusScore'
  ];

  function AnalysisConsensusAnswerCtrl($stateParams, $scope, ResponseHelper, ResponseValidationService, AnalysisConsensusScore) {
    var vm = this;

    vm.responseId = $stateParams.response_id;
    vm.assessmentId = $stateParams.assessment_id;

    $scope.responseId = vm.responseId;
    $scope.assessmentId = vm.assessmentId;

    vm.selectedProductEntries = function () {
      return _.filter($scope.productEntries, function (productEntry) {
        return _.includes($scope.question.score.supporting_inventory_response.product_entries, productEntry.id);
      });
    };
    vm.selectedInventoryDataEntries = function () {
      return _.filter($scope.inventoryDataEntries, function (inventoryDataEntry) {
        return _.includes($scope.question.score.supporting_inventory_response.data_entries, inventoryDataEntry.id);
      });
    };

    vm.answerTitle = ResponseHelper.answerTitle;

    vm.assignAnswerToQuestion = function(answer, question) {
      if ($scope.isConsensus === 'true') {
        if (!(question && question.score) || (question.score.evidence === null || question.score.evidence === '')) {
          question.isAlert = true;
          return;
        }
        ResponseHelper.assignAnswerToQuestion($scope, answer, question);
      } else {
        if (ResponseValidationService.invalidEvidence(question)) {
          return;
        }
        question.skipped = false;
        question.score.value = answer.value;
        ResponseHelper.assignAnswerToQuestion($scope, answer, question);
      }
    };

    vm.saveScore = function () {
      var params = {
        response_id: $scope.$parent.consensus.id,
        analysis_id: $scope.$parent.entity.id
      }

      var score = $scope.question.score;

      AnalysisConsensusScore.save(params, $scope.question.score)
    };
  }
})();
