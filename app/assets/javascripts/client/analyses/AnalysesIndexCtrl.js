(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysesIndexCtrl', AnalysesIndexCtrl);

  AnalysesIndexCtrl.$inject = [
    'SessionService',
    'analyses_result'
  ];

  function AnalysesIndexCtrl(SessionService, analyses_result) {
    var vm = this;

    vm.user = SessionService.getCurrentUser();
    vm.analyses = analyses_result.analyses;

    vm.openAnalysisModal = function() {
      $modal.open({
        templateUrl: 'client/analyses/analysis_modal.html',
        controller: 'AnalysisModalCtrl',
        controllerAs: 'analysisModal',
        resolve: {
          preSelectedInventory: function() {
            return null;
          }
        }
      });
    }
  }
})();