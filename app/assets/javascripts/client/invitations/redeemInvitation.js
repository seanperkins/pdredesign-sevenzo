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
      controller: 'RedeemInvitationCtrl',
      controllerAs: 'vm',
      link: redeemInvitationLink
    };
  }

  function redeemInvitationLink(scope, element, attrs, controller) {
    var invitationMessage = sessionStorage.getItem('invitation_message');

    if (invitationMessage) {
      controller.alerts.push({type: 'info', msg: invitationMessage});
      sessionStorage.removeItem('invitation_message');
    }
  }
})();