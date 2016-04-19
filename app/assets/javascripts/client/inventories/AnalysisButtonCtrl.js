(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisButtonCtrl', AnalysisButtonCtrl);

  AnalysisButtonCtrl.$inject = [
    '$scope',
    '$modal'
  ];

  function AnalysisButtonCtrl($scope, $modal) {
    var vm = this;

    vm.showAnalysisModal = function() {
      vm.modalInstance = $modal.open({
        template: '<analysis-modal></analysis-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-analysis-modal', function() {
      vm.modalInstance.dismiss('cancel');
    });

    $scope.$on('close-inventory-modal', function() {
      vm.modalInstance.dismiss('cancel');
    });
  }
})();
