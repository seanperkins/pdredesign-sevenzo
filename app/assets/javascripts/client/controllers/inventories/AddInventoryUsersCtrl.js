PDRClient.controller('AddInventoryUsersCtrl', [
  '$scope',
  'InventoryInvitable',
  function($scope, InventoryInvitable) {
    $scope.invitables = InventoryInvitable.list({ inventory_id: $scope.inventoryId });

    $scope.addUser = function(user) {

    };
  }
]);
