(function() {
  'use strict';
  angular.module('PDRClient').controller('ManageInventoryAccessRequestsCtrl', ManageInventoryAccessRequestsCtrl); 

  ManageInventoryAccessRequestsCtrl.$inject = ['$scope', 'InventoryAccessRequest'];

  function ManageInventoryAccessRequestsCtrl($scope, InventoryAccessRequest) {
    var vm = this;
    vm.loadList = function() {
      vm.list = InventoryAccessRequest.list({inventory_id: $scope.inventoryId});
    };
    vm.loadList();

    vm.performAccessRequestAction = function(id, status) {
      var params = { inventory_id: $scope.inventoryId, id: id };

      InventoryAccessRequest.update(params, { status: status })
      .$promise
      .then(function() {
        vm.loadList();
      });
    }

    vm.denyRequest = function(id) {
      if (confirm("Are you sure you want to deny this access request?")){
        vm.performAccessRequestAction(
          id,
          'denied');
      }
    };

    vm.acceptRequest = function(id) {
      if (confirm("Are you sure you want to accept this access request?")){
        vm.performAccessRequestAction(
          id,
          'accepted');
      }
    };
  }
})();
