(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('AddUsersCtrl', AddUsersCtrl);

  AddUsersCtrl.$inject = [
    '$scope',
    '$rootScope',
    'ToolMemberService'
  ];

  function AddUsersCtrl($scope, $rootScope, ToolMemberService) {
    var vm = this;

    vm.loadInvitables = function () {
      $rootScope.$broadcast('start_change');
      ToolMemberService.updateInvitableParticipantList()
        .then(function (result) {
          vm.invitables = result;
          $rootScope.$broadcast('update_participants');
          $rootScope.$broadcast('success_change');
        }).catch(function () {
          $rootScope.$broadcast('success_change');
      });
    };

    vm.addUser = function (user) {
      ToolMemberService.createParticipant(user)
        .then(function() {
          vm.loadInvitables();
          $scope.$emit('close-add-participants');
        });
    };

    vm.loadInvitables();
  }
})();
