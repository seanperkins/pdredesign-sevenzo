(function() {
  'use strict';
  angular.module('PDRClient').controller('AddInventoryUsersLinkCtrl', AddInventoryUsersLinkCtrl); 
  AddInventoryUsersLinkCtrl.$inject = ['$modal', '$scope'];
  function AddInventoryUsersLinkCtrl($modal, $scope) {
    var vm = this;
    vm.open = function() {
      vm.modal = $modal.open({
        templateUrl: 'client/inventories/add_inventory_users_modal.html',
        scope: $scope,
        windowClass: 'request-access-window'
      });
    };
    vm.close = function() {
      vm.modal.dismiss();
    };
  }
})();
