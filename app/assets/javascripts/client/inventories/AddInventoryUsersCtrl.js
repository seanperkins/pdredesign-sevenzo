(function() {
  'use strict';

  angular.module('PDRClient').controller('AddInventoryUsersCtrl', AddInventoryUsersCtrl);

  AddInventoryUsersCtrl.$inject = ['$scope', 'InventoryInvitable', 'InventoryParticipant'];
  function AddInventoryUsersCtrl($scope, InventoryInvitable, InventoryParticipant) {
    var vm = this;
    vm.reloadInvitables = function() {
      vm.invitables = InventoryInvitable.list({ inventory_id: $scope.inventoryId });
    }
    vm.reloadInvitables();

    vm.addUser = function(user) {
      InventoryParticipant.create({ inventory_id: $scope.inventoryId }, { user_id: user.id }).$promise.then(function() {
        vm.reloadInvitables();
      });
    };
  }
})();
