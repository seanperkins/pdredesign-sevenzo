(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('StartAssessmentCtrl', StartAssessmentCtrl);

  StartAssessmentCtrl.$inject = [
    '$modal',
    'SessionService',
    'RecommendationTextService'
  ];

  function StartAssessmentCtrl($modal, SessionService, RecommendationTextService) {
    var vm = this;

    vm.text = function() {
      return RecommendationTextService.assessmentText();
    };

    vm.userIsNetworkPartner = function() {
      return SessionService.isNetworkPartner();
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