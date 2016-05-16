(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisScheduleCtrl', AnalysisScheduleCtrl);

  AnalysisScheduleCtrl.$inject = [
    '$scope',
    '$modal'
  ];

  function AnalysisScheduleCtrl($scope, $modal) {
    var vm = this;
    vm.onlySchedule = $scope.onlySchedule;

    vm.displayLearningQuestions = function () {
      vm.modal = $modal.open({
        template: '<learning-question-modal context="analysis" reminder="false" />',
        scope: $scope
      });
    };

    $scope.$on('close-learning-question-modal', function() {
      vm.modal.dismiss('cancel');
    });

    $scope.$watch('analysis', function(val) {
      var date = moment(val.deadline);
      vm.month = date.format('MMM');
      vm.day = date.format('DD');
      vm.formattedDueDate = date.format('dddd MMMM Do');
    }).bind(vm);
  }
})();
