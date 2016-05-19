(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('StartAnalysisCtrl', StartAnalysisCtrl);

  StartAnalysisCtrl.$inject = [
    '$modal',
    'RecommendationTextService'
  ];

  function StartAnalysisCtrl($modal, RecommendationTextService) {
    var vm = this;

    vm.text = function() {
      return RecommendationTextService.analysisText();
    };

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
