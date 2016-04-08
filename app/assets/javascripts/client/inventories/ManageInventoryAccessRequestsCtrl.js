(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ManageInventoryAccessRequestsCtrl', ManageInventoryAccessRequestsCtrl);

  ManageInventoryAccessRequestsCtrl.$inject = [
    '$stateParams',
    '$window',
    'InventoryAccessRequest'
  ];

  function ManageInventoryAccessRequestsCtrl($stateParams, $window, InventoryAccessRequest) {
    var vm = this;

    vm.loadList = function() {
      vm.list = InventoryAccessRequest.list({inventory_id: $stateParams.id});
    };

    vm.loadList();

    vm.performAccessRequestAction = function(id, status) {
      var params = {inventory_id: $stateParams.id, id: id};

      InventoryAccessRequest.update(params, {status: status})
          .$promise
          .then(function() {
            vm.loadList();
          });
    };

    vm.denyRequest = function(id) {
      if ($window.confirm('Are you sure you want to deny this access request?')){
        vm.performAccessRequestAction(
          id,
          'denied');
      }
    };

    vm.acceptRequest = function(id) {
      if ($window.confirm('Are you sure you want to accept this access request?')){
        vm.performAccessRequestAction(
          id,
          'accepted');
      }
    };

    vm.humanPermissionName = function(value) {
      return value === '' ? 'None' : value;
    };
  }
})();
