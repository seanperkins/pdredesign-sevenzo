(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('QuestionContainerCtrl', QuestionContainerCtrl);

  QuestionContainerCtrl.$inject = [
    '$scope',
    'ResponseHelper',
    'ConsensusService'
  ];

  function QuestionContainerCtrl($scope, ResponseHelper, ConsensusService) {
    var vm = this;

    vm.questionType = $scope.questionType;

    vm.questionColor = ResponseHelper.questionColor;

    vm.toggleAnswers = function (question, $event) {
      $scope.$broadcast('question-toggled', question.id);
      ResponseHelper.toggleAnswers(question, $event);
    };

    if (vm.questionType === "analysis") {
      ConsensusService
        .getInventoryProductAndDataEntries()
        .then(function (data) {
          vm.productEntries = data[0].product_entries;
          vm.dataEntries = data[1].data_entries;
        });
    }
  }
})();
