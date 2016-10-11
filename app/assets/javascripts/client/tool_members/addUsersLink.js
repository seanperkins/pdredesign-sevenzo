(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('addUsersLink', addUsersLink);

  function addUsersLink() {
    return {
      restrict: 'E',
      scope: {
        context: '@'
      },
      templateUrl: 'client/tool_members/add_users_link.html',
      controller: 'AddUsersLinkCtrl',
      controllerAs: 'vm'
    };
  }
})();