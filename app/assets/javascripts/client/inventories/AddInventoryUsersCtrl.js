(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AddInventoryUsersCtrl', AddInventoryUsersCtrl);

  AddInventoryUsersCtrl.$inject = [
    '$scope',
    '$rootScope',
    'CreateService'
  ];

  function AddInventoryUsersCtrl($scope, $rootScope, CreateService) {
    var vm = this;

    vm.loadInvitables = function() {
      $rootScope.$broadcast('start_change');
      CreateService.updateInvitableParticipantList()
          .then(function(result) {
            vm.invitables = result;
            $scope.$emit('update_participants');
            $rootScope.$broadcast('success_change');
          });
    };

    vm.addUser = function(user) {
      CreateService.createParticipant(user)
          .then(function() {
            vm.loadInvitables();
            $scope.$emit('close-add-participants');
          });
    };

    vm.loadInvitables();
  }
})();
