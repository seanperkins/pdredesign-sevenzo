(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('inviteInventoryUserLink', inviteInventoryUserLink);

  function inviteInventoryUserLink() {
    return {
      restrict: 'E',
      scope: {
        inventoryId: '='
      },
      templateUrl: 'client/inventories/invite_inventory_user_link.html',
      controller: 'InviteInventoryUserLinkCtrl',
      controllerAs: 'inviteInventoryUserLink',
      replace: true
    }
  }
})();
