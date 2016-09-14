(function () {
  'use strict';

  angular.module('PDRClient')
    .service('InvitationService', InvitationService);

  InvitationService.$inject = [
    'Invitation'
  ];

  function InvitationService(Invitation) {
    var service = this;

    service.saveInvitation = function (token, invite) {
      return Invitation.save({token: token}, invite).$promise;
    };

    service.getInvitedUser = function (token) {
      return Invitation.get({token: token});
    };
  }
})();