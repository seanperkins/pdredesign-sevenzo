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

    ToolMemberService.setContext($scope.context);

    vm.loadInvitables = function () {
      $rootScope.$broadcast('start_change');
      ToolMemberService.updateInvitableParticipantList()
        .then(function (result) {
          vm.invitables = result;
          $rootScope.$broadcast('success_change');
        }).catch(function () {
          $rootScope.$broadcast('success_change');
      });
    };

    vm.addUser = function (user) {
      var roles = [1];
      user.send_invite = $scope.automaticallySendInvitation === 'true';
      ToolMemberService.createParticipant(user, roles)
        .then(function() {
          $rootScope.$broadcast('update_participants');
          $scope.$emit('close-add-participants');
        });
    };

    vm.loadInvitables();
  }
})();
