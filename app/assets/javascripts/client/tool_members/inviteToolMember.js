(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('inviteToolMember', inviteToolMember);

  function inviteToolMember() {
    return {
      restrict: 'E',
      scope: {
        context: '@'
      },
      templateUrl: 'client/tool_members/invite_tool_member.html',
      controller: 'InviteToolMemberCtrl',
      controllerAs: 'vm'
    };
  }
})();