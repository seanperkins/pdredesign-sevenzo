(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('inviteInventoryUser', inviteInventoryUser);

  function inviteInventoryUser() {
    return {
      restrict: 'E',
      scope: {
        sendInvite: '@'
      },
      templateUrl: 'client/inventories/invite_inventory_user.html',
      controller: 'InviteInventoryUserCtrl',
      controllerAs: 'inviteInventoryUser',
      replace: true
    }
  }
})();
