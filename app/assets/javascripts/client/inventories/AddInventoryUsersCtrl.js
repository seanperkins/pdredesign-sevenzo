(function() {
  'use strict';
  angular.module('PDRClient').controller('AddInventoryUsersCtrl', [
    '$scope',
    'InventoryInvitable',
    'InventoryParticipant',
    function($scope, InventoryInvitable, InventoryParticipant) {
      $scope.reloadInvitables = function() {
        $scope.invitables = InventoryInvitable.list({ inventory_id: $scope.inventoryId });
      }
      $scope.reloadInvitables();

      $scope.addUser = function(user) {
        InventoryParticipant.create({ inventory_id: $scope.inventoryId }, { user_id: user.id }).$promise.then(function() {
          $scope.reloadInvitables();
        });
      };
    }
  ]);
})();
