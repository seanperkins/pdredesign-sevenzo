(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AssessmentEntityStatusCtrl', AssessmentEntityStatusCtrl);

  function AssessmentEntityStatusCtrl() {
    var vm = this;

    vm.consensusReportIcon = function(entity) {
      if (entity.consensus && entity.consensus.is_completed) {
        return 'fa-check';
      } else {
        return 'fa-spinner';
      }
    };

    vm.draftStatusIcon = function(entity) {
      if (entity.has_access) {
        return 'fa-eye';
      } else {
        return 'fa-minus-circle';
      }
    };

    vm.roundNumber = function(number) {
      return Math.floor(number);
    };
  }
})();