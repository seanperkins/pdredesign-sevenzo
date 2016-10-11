(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('managePermissions', managePermissions);

  function managePermissions() {
    return {
      restrict: 'E',
      scope: {
        context: '@',
        closeFn: '&'
      },
      templateUrl: 'client/tool_members/manage_permissions.html',
      controller: 'ManagePermissionsCtrl',
      controllerAs: 'vm'
    };
  }
})();