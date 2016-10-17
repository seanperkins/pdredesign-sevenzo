(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('assessmentLinks', assessmentLinks);

  function assessmentLinks() {
    return {
      restrict: 'E',
      scope: {
        active: '@',
        title: '@',
        type: '@',
        role: '@',
        id: '@',
        consensusId: '@'
      },
      templateUrl: 'client/views/directives/assessment_index_links.html',
      controller: 'AssessmentLinksCtrl',
      controllerAs: 'vm'
    };
  }
})();
