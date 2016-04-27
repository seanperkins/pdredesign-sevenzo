(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AddAnalysisUsersCtrl', AddAnalysisUsersCtrl);

  AddAnalysisUsersCtrl.$inject = [
    '$scope',
    'CreateService'
  ];

  function AddAnalysisUsersCtrl($scope, CreateService) {
    var vm = this;

    vm.loadInvitables = function() {
      return CreateService.updateInvitableParticipantList()
          .then(function(result) {
            vm.invitables = result;
            $scope.$emit('update_participants');
          });
    };

    vm.addUser = function(user) {
      CreateService.createParticipant(user)
          .then(function() {
            vm.loadInvitables().then(function () {
              $scope.$emit('close-add-participants');
            });
          });
    };

    vm.loadInvitables();
  }
})();
