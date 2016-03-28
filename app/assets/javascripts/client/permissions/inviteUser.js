(function() {
  'use strict';
  angular.module('PDRClient')
      .directive('inviteUser', inviteUser);

  function inviteUser() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'client/permissions/invite_user.html',
      scope: {
        'assessmentId': '@',
        'sendInvite': '@',
        'role': '@'
      },
      controller: 'InviteUserCtrl'
    };
  }
})();
