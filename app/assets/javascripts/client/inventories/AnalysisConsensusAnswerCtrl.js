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

    vm.saveScore = function () {
      var params = {
        inventory_id: $stateParams.inventory_id,
        response_id: $scope.$parent.consensus.id,
        analysis_id: $scope.$parent.entity.id
      }

      var score = angular.copy($scope.question.score);
      score.supporting_inventory_response_attributes = score.supporting_inventory_response;
      delete score.supporting_inventory_response;

      AnalysisConsensusScore
        .save(params, score)
        .$promise
        .then(function () {
          $scope.$emit('response_updated');
        });
    };
  }
})();
