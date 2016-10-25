(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('addUsers', addUsers);

  function addUsers() {
    return {
      restrict: 'E',
      scope: {
        context: '@',
        automaticallySendInvitation: '@'
      },
      templateUrl: 'client/tool_members/add_users.html',
      controller: 'AddUsersCtrl',
      controllerAs: 'vm'
    }
  }
})();