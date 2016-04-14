(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('inviteInventoryUser', inviteInventoryUser);

  function inviteInventoryUser() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'client/inventories/invite_inventory_user.html',
      controller: 'InviteInventoryUserCtrl',
      controllerAs: 'inviteInventoryUser',
      replace: true
    }
  }
})();
