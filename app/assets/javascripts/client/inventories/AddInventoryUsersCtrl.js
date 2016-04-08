(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AddInventoryUsersCtrl', AddInventoryUsersCtrl);

  AddInventoryUsersCtrl.$inject = [
    '$scope',
    'CreateService'
  ];

  function AddInventoryUsersCtrl($scope, CreateService) {
    var vm = this;

    vm.loadInvitables = function() {
      CreateService.updateInvitableParticipantList()
          .then(function(result) {
            vm.invitables = result;
            $scope.$emit('update_participants');
          });
    };

    vm.loadInvitables();

    vm.addUser = function(user) {
      CreateService.createParticipant(user)
          .then(function() {
            vm.loadInvitables();
          });
    };
  }
})();
