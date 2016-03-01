(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ResponseAnswerGroupCtrl', ResponseAnswerGroupCtrl);

  ResponseAnswerGroupCtrl.$inject = [
    '$stateParams',
    '$scope',
    'ResponseHelper'
  ];

  function ResponseAnswerGroupCtrl($stateParams, $scope, ResponseHelper) {
    var vm = this;

    vm.responseId = $stateParams.response_id;
    vm.assessmentId = $stateParams.assessment_id;

    $scope.responseId = vm.responseId;
    $scope.assessmentId = vm.assessmentId;

    vm.assignAnswerToQuestion = function(answer, question) {
      ResponseHelper.assignAnswerToQuestion($scope, answer, question);
    };
  }
})();