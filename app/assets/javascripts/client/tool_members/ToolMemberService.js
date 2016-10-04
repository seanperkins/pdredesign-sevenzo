(function () {
  'use strict';

  angular.module('PDRClient')
    .service('ToolMemberService', ToolMemberService);

  ToolMemberService.$inject = [
    '$stateParams',
    'ToolMember'
  ];

  function ToolMemberService($stateParams, ToolMember) {
    var service = this;

    service.setContext = function (context) {
      service.context = context;
    };

    service.extractId = function () {
      return $stateParams.inventory_id || $stateParams.assessment_id || $stateParams.id;
    };

    service.loadParticipants = function () {
      return ToolMember.query({
        tool_type: service.context,
        tool_id: service.extractId()
      });
    };

    service.removeParticipant = function (participant) {
      // if (service.context === 'assessment') {
      //   return Participant.delete({
      //     assessment_id: service.extractId(),
      //     id: participant.participant_id
      //   }, {user_id: participant.id}).$promise;
      // } else if (service.context === 'inventory') {
      //   return InventoryParticipant.delete({
      //     inventory_id: service.extractId(),
      //     id: participant.participant_id
      //   }).$promise;
      // } else if (service.context === 'analysis') {
      //   return AnalysisParticipant.delete({
      //     inventory_id: $stateParams.inventory_id,
      //     analysis_id: $stateParams.id,
      //     id: participant.participant_id
      //   }).$promise;
      // }
    };

    service.updateParticipantList = function () {
      return ToolMember.query({
        tool_type: service.context,
        tool_id: service.extractId()
      }).$promise;
    };

    service.updateInvitableParticipantList = function () {
      return ToolMember.invitableMembers({
        tool_type: service.context,
        tool_id: service.extractId()
      }).$promise;
    };

    service.createParticipant = function (user) {
      return ToolMember.create({
        tool_member: {
          user_id: user.id,
          role: 1,
          tool_type: service.context,
          tool_id: service.extractId()
        }
      }).$promise;
    };

    service.loadPermissionRequests = function () {
      return ToolMember.permissionRequests({
        tool_type: service.context,
        tool_id: service.extractId()
      });
    };

    service.denyRequest = function (request_id) {
      return ToolMember.deny({
        tool_type: service.context,
        tool_id: service.extractId(),
        id: request_id
      }).$promise;
    };

    service.grantRequest = function (request_id) {
      return ToolMember.grant({
        tool_type: service.context,
        tool_id: service.extractId(),
        id: request_id
      }).$promise;
    };

    service.loadAllMembers = function() {
      return ToolMember.showAll({
        tool_type: service.context,
        tool_id: service.extractId()
      });
    }
  }
})();