(function () {
  'use strict';

  angular.module('PDRClient')
    .service('ToolMemberService', ToolMemberService);

  ToolMemberService.$inject = [
    '$stateParams',
    'ToolMember',
    'UserInvitation',
    'InventoryInvitation',
    'AnalysisInvitation'
  ];

  function ToolMemberService($stateParams, ToolMember, UserInvitation, InventoryInvitation, AnalysisInvitation) {
    var service = this;

    service.setContext = function (context) {
      service.context = context;
    };

    service.extractId = function () {
      return $stateParams.analysis_id || $stateParams.inventory_id || $stateParams.assessment_id || $stateParams.id;
    };

    service.loadParticipants = function () {
      return ToolMember.query({
        tool_type: service.context,
        tool_id: service.extractId()
      });
    };

    service.updatePermissions = function (member) {
      return ToolMember.create({
        tool_member: {
          tool_type: service.context,
          tool_id: service.extractId(),
          user_id: member.user_id,
          roles: member.roles
        }
      }).$promise;
    };

    service.removeMember = function (member) {
      return ToolMember.revoke({
        id: member.id
      }).$promise;
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

    service.createParticipant = function (user, roles) {
      return ToolMember.create({
        tool_member: {
          user_id: user.id,
          roles: roles,
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

    service.requestAccess = function (toolId, role) {
      return ToolMember.requestAccess({
        tool_type: service.context,
        tool_id: toolId
      }, {
        access_request: {
          roles: [
            role
          ]
        }
      }).$promise;
    };

    service.loadAllMembers = function () {
      return ToolMember.showAll({
        tool_type: service.context,
        tool_id: service.extractId()
      });
    };

    service.sendInvitation = function (invitedUser) {
      switch (service.context) {
        case 'assessment':
          return UserInvitation.create({
            assessment_id: $stateParams.id
          }, invitedUser)
            .$promise;
        case 'analysis':
          return AnalysisInvitation.create({
            inventory_id: $stateParams.inventory_id,
            analysis_id: $stateParams.analysis_id
          }, invitedUser)
            .$promise;
        case 'inventory':
          return InventoryInvitation.create({
            inventory_id: $stateParams.inventory_id
          }, invitedUser)
            .$promise;
      }
    };
  }
})();