(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('addInventoryUsers', addInventoryUsers);

  function addInventoryUsers() {
    return {
      restrict: 'E',
      scope: {
        inventoryId: '=inventoryId'
      },
      templateUrl: 'client/inventories/add_inventory_users.html',
      replace: true,
      controller: 'AddInventoryUsersCtrl',
      controllerAs: 'addInventoryUsers',
    }
  }
})();
