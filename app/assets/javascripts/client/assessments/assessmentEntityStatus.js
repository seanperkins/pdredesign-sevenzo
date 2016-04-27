(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('assessmentEntityStatus', assessmentEntityStatus);

  function assessmentEntityStatus() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        entity: '='
      },
      templateUrl: 'client/assessments/entity_status.html',
      controller: 'AssessmentEntityStatusCtrl',
      controllerAs: 'entityStatus'
    };
  }
})();