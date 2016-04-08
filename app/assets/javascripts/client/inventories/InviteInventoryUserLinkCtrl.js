(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InviteInventoryUserLinkCtrl', InviteInventoryUserLinkCtrl);

  InviteInventoryUserLinkCtrl.$inject = [
    '$modal',
    '$scope'
  ];

  function InviteInventoryUserLinkCtrl($modal, $scope) {
    var vm = this;
    vm.open = function() {
      vm.modal = $modal.open({
        templateUrl: 'client/inventories/invite_inventory_user_modal.html',
        scope: $scope,
        windowClass: 'request-access-window'
      });
    };

    vm.close = function() {
      vm.modal.dismiss();
    };
    
    $scope.$on('invite-sent', function() {
      vm.close();
    });
  }
})();
