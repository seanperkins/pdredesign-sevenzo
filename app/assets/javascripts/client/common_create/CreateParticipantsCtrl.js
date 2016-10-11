(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('CreateParticipantsCtrl', CreateParticipantsCtrl);

  CreateParticipantsCtrl.$inject = [
    '$scope',
    'SessionService',
    'CreateService',
    'ToolMemberService'
  ];

  function CreateParticipantsCtrl($scope, SessionService, CreateService, ToolMemberService) {
    var vm = this;

    if(vm.user) {
      $scope.role = vm.user.role;
    }

    vm.participants = CreateService.context === 'assessment' ? CreateService.loadParticipants() : [];
    vm.user = SessionService.getCurrentUser();

    // Expose context for view
    vm.currentContext = CreateService.context;
    ToolMemberService.setContext(CreateService.context);

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
      if(CreateService.context === 'assessment') {
        CreateService.removeParticipant(user)
          .then(function() {
            vm.loadParticipants();
          });
      } else {
        ToolMemberService.removeMember(user)
          .then(function () {
            vm.loadParticipants();
          });
      }
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

    vm.loadParticipants = function () {
      if(CreateService.context === 'assessment') {
        vm.updateParticipantsList();
      } else {
        vm.participants = ToolMemberService.loadParticipants();
      }
    };

    $scope.$on('update_participants', function() {
      vm.loadParticipants();
    });
  }
})();
