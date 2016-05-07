(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('StartAssessmentCtrl', StartAssessmentCtrl);

  StartAssessmentCtrl.$inject = [
    '$modal',
    'SessionService',
    'AssessmentService'
  ];

  function StartAssessmentCtrl($modal, SessionService, AssessmentService) {
    var vm = this;

    vm.text = function() {
      return AssessmentService.text();
    };

    vm.userIsNetworkPartner = function() {
      return AssessmentService.userIsNetworkPartner();
    };

    vm.openAssessmentModal = function() {
      vm.assessmentModal = $modal.open({
        templateUrl: 'client/home/assessment_modal.html',
        controller: 'AssessmentModalCtrl',
        controllerAs: 'assessmentModal'
      });
    };

    SessionService.syncUser();
  }
})();