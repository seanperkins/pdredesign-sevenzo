(function() {
  'use strict';
  angular.module('PDRClient').controller('ManageInventoryPermissionsCtrl', ManageInventoryPermissionsCtrl); 

  ManageInventoryPermissionsCtrl.$inject = ['$modal', '$scope', 'InventoryPermission'];

  function ManageInventoryPermissionsCtrl($modal, $scope, InventoryPermission) {
    var vm = this;
    vm.list = InventoryPermission.list({inventory_id: $scope.inventoryId});
  }
})();
