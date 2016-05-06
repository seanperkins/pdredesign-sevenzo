(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisButtonCtrl', AnalysisButtonCtrl);

  AnalysisButtonCtrl.$inject = [
    '$modal',
    'Inventory'
  ];

  function AnalysisButtonCtrl($modal) {
    var vm = this;

    vm.showAnalysisModal = function() {
      vm.modalInstance = $modal.open({
        templateUrl: 'client/analyses/analysis_modal.html',
        controller: 'AnalysisModalCtrl',
        controllerAs: 'analysisModal',
        resolve: {
          preSelectedInventory: function() {
            return null;
          }
        }
      });
    };
  }
})();
