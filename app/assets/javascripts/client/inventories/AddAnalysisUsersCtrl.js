(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AddAnalysisUsersCtrl', AddAnalysisUsersCtrl);

  AddAnalysisUsersCtrl.$inject = [
    '$scope',
    '$rootScope',
    'CreateService'
  ];

  function AddAnalysisUsersCtrl($scope, $rootScope, CreateService) {
    var vm = this;

    vm.loadInvitables = function() {
      $rootScope.$broadcast('start_change');
      return CreateService.updateInvitableParticipantList()
          .then(function(result) {
            vm.invitables = result;
            $scope.$emit('update_participants');
            $rootScope.$broadcast('success_change');
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
