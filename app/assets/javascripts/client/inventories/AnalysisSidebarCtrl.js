(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisSidebarCtrl', AnalysisSidebarCtrl);

  AnalysisSidebarCtrl.$inject = [
    'current_analysis',
    '$scope',
    '$modal'
  ];

  function AnalysisSidebarCtrl(current_analysis, $scope, $modal) {
    var vm = this;
    $scope.analysis = current_analysis;
    vm.currentAnalysis = current_analysis;

    vm.displayLearningQuestions = function() {
      vm.questionsModal = $modal.open({
        template: '<learning-question-modal context="analysis" reminder="false"></learning-question-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-learning-question-modal', function() {
      vm.questionsModal.dismiss('cancel');
    });
  }
})();
