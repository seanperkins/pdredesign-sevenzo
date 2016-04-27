(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AssessmentEntityStatusCtrl', AssessmentEntityStatusCtrl);

  AssessmentEntityStatusCtrl.$inject = [
    'EntityService'
  ];

  function AssessmentEntityStatusCtrl(EntityService) {
    var vm = this;

    vm.consensusReportIcon = EntityService.completedStatusIcon;
    vm.draftStatusIcon = EntityService.draftStatusIcon;
    vm.roundNumber = EntityService.roundNumber;
  }
})();