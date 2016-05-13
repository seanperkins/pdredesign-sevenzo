(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisEntityStatusCtrl', AnalysisEntityStatusCtrl);

  AnalysisEntityStatusCtrl.$inject = [
    'EntityService'
  ];

  function AnalysisEntityStatusCtrl(EntityService) {
    var vm = this;

    vm.consensusReportIcon = EntityService.completedStatusIcon;
    vm.draftStatusIcon = EntityService.draftStatusIcon;
    vm.roundNumber = EntityService.roundNumber;
  }
})();