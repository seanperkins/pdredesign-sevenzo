(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('AddInventoryUsersLinkCtrl', AddInventoryUsersLinkCtrl);

  AddInventoryUsersLinkCtrl.$inject = [
    '$modal',
    '$scope',
    '$stateParams',
    'InventoryInvitable'
  ];

  function AddInventoryUsersLinkCtrl($modal, $scope, $stateParams, InventoryInvitable) {
    var vm = this;
    vm.open = function() {
      vm.modal = $modal.open({
        templateUrl: 'client/inventories/add_inventory_users_modal.html',
        scope: $scope,
        windowClass: 'request-access-window',
        size: 'lg'
      });
    };

    vm.close = function() {
      vm.modal.dismiss();
    };

    vm.loadInvitables = function() {
      vm.invitables = InventoryInvitable.list({inventory_id: $stateParams.id});
    };
    vm.invitablesFound = function() {
      var list = vm.invitables;
      return list && list.length > 0;
    };
    vm.loadInvitables();
  }
})();
