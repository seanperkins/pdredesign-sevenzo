(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('inviteUserLink', inviteUserLink);

  function inviteUserLink() {
    return {
      restrict: 'E',
      scope: {
        context: '@'
      },
      templateUrl: 'client/tool_members/invite_user_link.html',
      controller: 'InviteUserLinkCtrl',
      controllerAs: 'vm'
    };
  }
})();