(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AddInventoryUsersCtrl', AddInventoryUsersCtrl);

  AddInventoryUsersCtrl.$inject = [
    '$stateParams',
    'InventoryParticipant'
  ];

  function AddInventoryUsersCtrl($stateParams, InventoryParticipant) {
    var vm = this;

    vm.loadInvitables = function() {
      vm.invitables = InventoryParticipant.all({inventory_id: $stateParams.id});
    };

    vm.loadInvitables();

    vm.addUser = function(user) {
      InventoryParticipant
          .create({inventory_id: $stateParams.id}, {user_id: user.id})
          .$promise
          .then(function() {
            vm.loadInvitables();
          });
    };
  }
})();
