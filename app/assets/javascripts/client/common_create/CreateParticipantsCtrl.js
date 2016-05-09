(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('CreateParticipantsCtrl', CreateParticipantsCtrl);

  CreateParticipantsCtrl.$inject = [
    '$scope',
    'SessionService',
    'CreateService'
  ];

  function CreateParticipantsCtrl($scope, SessionService, CreateService) {
    var vm = this;

    vm.participants = CreateService.loadParticipants();
    vm.user = SessionService.getCurrentUser();
    if(vm.user) {
      $scope.role = vm.user.role;
    }

    // Expose context for view
    vm.currentContext = CreateService.context;

    vm.isNetworkPartner = function() {
      return SessionService.isNetworkPartner();
    };

    vm.displayToolType = function() {
      if (CreateService.context === 'assessment') {
        return 'Readiness Assessment';
      } else if (CreateService.context === 'inventory') {
        return 'Data & Tech Inventory';
      } else if (CreateService.context === 'analysis') {
        return 'Analysis';
      }
    };

    vm.removeParticipant = function(user) {
      CreateService.removeParticipant(user)
          .then(function() {
            vm.updateParticipantsList();
          });
    };

    vm.updateParticipantsList = function() {
      CreateService.updateParticipantList()
          .then(function(data) {
            vm.participants = data;
          }, function() {
            CreateService.emitError('Could not update participants list');
          });

      CreateService.updateInvitableParticipantList()
          .then(function(data) {
            vm.invitableParticipants = data;
          }, function() {
            CreateService.emitError('Could not update invitable participants list');
          });
    };

    $scope.$on('update_participants', function() {
      vm.updateParticipantsList();
    });
  }
})();
