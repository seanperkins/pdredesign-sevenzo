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

    service.setContext = function(context) {
      service.context = context;
    };

    service.extractId = function() {
      return $stateParams.inventory_id || $stateParams.assessment_id || $stateParams.id;
    };

    service.loadParticipants = function() {
      return ToolMember.query({tool_type: service.context, tool_id: service.extractId()});

    };

    service.removeParticipant = function(participant) {
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

    service.updateParticipantList = function() {
      return ToolMember.query({tool_type: service.context, tool_id: service.extractId()}).$promise;
    };

    service.updateInvitableParticipantList = function() {
      return ToolMember.invitableMembers({tool_type: service.context, tool_id: service.extractId()}).$promise;

      // if (service.context === 'assessment') {
      //   return Participant.all({assessment_id: service.extractId()})
      //     .$promise;
      // } else if (service.context === 'inventory') {
      //   return InventoryParticipant.all({inventory_id: service.extractId()})
      //     .$promise;
      // } else if (service.context === 'analysis') {
      //   return AnalysisParticipant.all({inventory_id: service.extractId(), analysis_id: $stateParams.id})
      //     .$promise;
      // }
    };

    service.createParticipant = function(user) {
      // if (service.context === 'inventory') {
      //   return InventoryParticipant.create({
      //     inventory_id: service.extractId()
      //   }, {user_id: user.id}).$promise;
      // } else if (service.context === 'analysis') {
      //   return AnalysisParticipant.create({
      //     inventory_id: $stateParams.inventory_id,
      //     analysis_id: $stateParams.id
      //   }, {user_id: user.id}).$promise;
      // }
    };
  }
})();