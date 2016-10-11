(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('managePermissionsLink', managePermissionsLink);

  function managePermissionsLink() {
    return {
      restrict: 'E',
      scope: {
        context: '@'
      },
      templateUrl: 'client/tool_members/manage_permissions_link.html',
      controller: 'ManagePermissionsLinkCtrl',
      controllerAs: 'vm'
    }
  }
})();