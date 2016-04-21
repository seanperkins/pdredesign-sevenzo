(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('addAnalysisUsersLink', addAnalysisUsersLink);

  function addAnalysisUsersLink() {
    return {
      restrict: 'E',
      scope: {
        analysisId: '=analysisId'
      },
      templateUrl: 'client/inventories/add_analysis_users_link.html',
      controller: 'AddAnalysisUsersLinkCtrl',
      controllerAs: 'analysisUsersLink',
      replace: true
    }
  }
})();
