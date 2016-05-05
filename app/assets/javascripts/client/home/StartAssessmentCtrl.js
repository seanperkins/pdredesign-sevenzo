(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('StartAssessmentCtrl', StartAssessmentCtrl);

  StartAssessmentCtrl.$inject = [
    '$scope',
    '$modal',
    'SessionService',
    'AssessmentService'
  ];

  function StartAssessmentCtrl($scope,  $modal, SessionService, AssessmentService) {
    var vm = this;

    vm.text = AssessmentService.text;
    vm.userIsNetworkPartner = AssessmentService.userIsNetworkPartner;

    vm.openAssessmentModal = function() {
      vm.assessmentModal = $modal.open({
        template: '<assessment-modal></assessment-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-assessment-modal', function() {
      vm.assessmentModal.close('cancel');
    });

    SessionService.syncUser();
  }
})();