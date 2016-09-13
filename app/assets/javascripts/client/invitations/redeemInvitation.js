(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('redeemInvitation', redeemInvitation);

  function redeemInvitation() {
    return {
      restrict: 'E',
      scope: {
        token: '@'
      },
      templateUrl: 'client/invitations/redeem_invitation.html',
      controller: 'RedeemInvitationCtrl'
    }
  }
})();