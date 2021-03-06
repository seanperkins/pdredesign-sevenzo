(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('VarianceCategoryContainerCtrl', VarianceCategoryContainerCtrl);

  VarianceCategoryContainerCtrl.$inject = [
    '$scope',
    'ResponseHelper'
  ];

  function VarianceCategoryContainerCtrl($scope, ResponseHelper) {
    var vm = this;

    vm.questionColor = ResponseHelper.questionColor;

    vm.toggleAnswers = function (question, $event) {
      $scope.$broadcast('question-toggled', question.id);
      ResponseHelper.toggleAnswers(question, $event);
    };
  }
})();
