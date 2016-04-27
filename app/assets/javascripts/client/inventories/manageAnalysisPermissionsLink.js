(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('manageAnalysisPermissionsLink', manageAnalysisPermissionsLink);

  function manageAnalysisPermissionsLink() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'client/inventories/manage_analysis_permissions_link.html',
      controller: 'ManageAnalysisPermissionsLinkCtrl',
      controllerAs: 'manageAnalysisPermissionsLink',
      replace: true
    }
  }
})();
