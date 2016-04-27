(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('manageAnalysisPermissions', manageAnalysisPermissions);

  function manageAnalysisPermissions() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'client/inventories/manage_analysis_permissions.html',
      controller: 'ManageAnalysisPermissionsCtrl',
      controllerAs: 'manageAnalysisPermissions',
      replace: true
    }
  }
})();
