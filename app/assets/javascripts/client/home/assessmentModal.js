(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('assessmentModal', assessmentModal);

  function assessmentModal() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        modalTitle: '&'
      },
      templateUrl: 'client/home/assessment_modal.html',
      controller: 'AssessmentModalCtrl',
      controllerAs: 'assessmentModal'
    }
  }
})();