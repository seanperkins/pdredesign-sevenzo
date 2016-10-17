(function () {
  'use strict';

  describe('Service: ToolMember', function () {
    var subject,
      ToolMember;

    describe('#setContext', function () {
      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_) {
          subject = _ToolMemberService_;
        });

        subject.setContext('foo');
      });

      it('binds the context appropriately', function () {
        expect(subject.context).toBe('foo')
      });
    });

    describe('#extractId', function () {
      describe('when the parameter contains an analysis ID', function () {
        describe('when there are no other IDs', function () {
          beforeEach(function () {
            module('PDRClient', function ($provide) {
              $provide.value('$stateParams', {analysis_id: 13});
            });

            inject(function (_ToolMemberService_) {
              subject = _ToolMemberService_;
            });
          });

          it('returns the correct value', function () {
            expect(subject.extractId()).toBe(13);
          });
        });

        describe('when there is an analysis ID present', function () {
          beforeEach(function () {
            module('PDRClient', function ($provide) {
              $provide.value('$stateParams', {analysis_id: 13, assessment_id: 17});
            });

            inject(function (_ToolMemberService_) {
              subject = _ToolMemberService_;
            });
          });

          it('returns the analysis ID', function () {
            expect(subject.extractId()).toBe(13);
          });
        });
      });

      describe('when the parameter contains an inventory ID', function () {
        describe('when there are no other IDs', function () {
          beforeEach(function () {
            module('PDRClient', function ($provide) {
              $provide.value('$stateParams', {inventory_id: 7});
            });

            inject(function (_ToolMemberService_) {
              subject = _ToolMemberService_;
            });
          });

          it('returns the correct value', function () {
            expect(subject.extractId()).toBe(7);
          });
        });

        describe('when there is an analysis ID present', function () {
          beforeEach(function () {
            module('PDRClient', function ($provide) {
              $provide.value('$stateParams', {analysis_id: 88, inventory_id: 12});
            });

            inject(function (_ToolMemberService_) {
              subject = _ToolMemberService_;
            });
          });

          it('returns the analysis ID', function () {
            expect(subject.extractId()).toBe(88);
          });
        });
      });

      describe('when the parameter contains an assessment ID', function () {
        describe('when there are no other IDs', function () {
          beforeEach(function () {
            module('PDRClient', function ($provide) {
              $provide.value('$stateParams', {assessment_id: 335});
            });

            inject(function (_ToolMemberService_) {
              subject = _ToolMemberService_;
            });
          });

          it('returns the correct value', function () {
            expect(subject.extractId()).toBe(335);
          });
        });

        describe('when there is an analysis ID present', function () {
          beforeEach(function () {
            module('PDRClient', function ($provide) {
              $provide.value('$stateParams', {analysis_id: 1254, assessment_id: 2});
            });

            inject(function (_ToolMemberService_) {
              subject = _ToolMemberService_;
            });
          });

          it('returns the analysis ID', function () {
            expect(subject.extractId()).toBe(1254);
          });
        });
      });

      describe('when the parameter contains a nondescript ID', function () {
        describe('when there are no other IDs', function () {
          beforeEach(function () {
            module('PDRClient', function ($provide) {
              $provide.value('$stateParams', {id: 1337});
            });

            inject(function (_ToolMemberService_) {
              subject = _ToolMemberService_;
            });
          });

          it('returns the correct value', function () {
            expect(subject.extractId()).toBe(1337);
          });
        });

        describe('when there is an analysis ID present', function () {
          beforeEach(function () {
            module('PDRClient', function ($provide) {
              $provide.value('$stateParams', {analysis_id: 9001, id: 1335});
            });

            inject(function (_ToolMemberService_) {
              subject = _ToolMemberService_;
            });
          });

          it('returns the analysis ID', function () {
            expect(subject.extractId()).toBe(9001);
          });
        })
      });
    });

    describe('#loadParticipants', function () {
      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_, _ToolMember_) {
          subject = _ToolMemberService_;
          ToolMember = _ToolMember_;
        });

        subject.context = 'alpha';

        spyOn(subject, 'extractId').and.returnValue(10);
        spyOn(ToolMember, 'query');

        subject.loadParticipants();
      });

      it('delegates to ToolMember#query', function () {
        expect(ToolMember.query).toHaveBeenCalledWith({
          tool_type: 'alpha',
          tool_id: 10
        });
      });
    });

    describe('#updatePermissions', function () {
      var $q,
        member = {
          user_id: 124,
          roles: ['foo', 'bar']
        };

      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_, _ToolMember_, _$q_) {
          subject = _ToolMemberService_;
          ToolMember = _ToolMember_;
          $q = _$q_;
        });

        subject.context = 'alpha';

        spyOn(subject, 'extractId').and.returnValue(10);
        spyOn(ToolMember, 'create').and.returnValue($q.when({}));

        subject.updatePermissions(member);
      });

      it('delegates to ToolMember#create', function () {
        expect(ToolMember.create).toHaveBeenCalledWith({
          tool_member: {
            tool_type: 'alpha',
            tool_id: 10,
            user_id: 124,
            roles: ['foo', 'bar']
          }
        });
      });
    });

    describe('#removeMember', function () {
      var $q,
        member = {
          id: 564
        };

      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_, _ToolMember_, _$q_) {
          subject = _ToolMemberService_;
          ToolMember = _ToolMember_;
          $q = _$q_;
        });

        spyOn(ToolMember, 'revoke').and.returnValue($q.when({}));

        subject.removeMember(member);
      });

      it('delegates to ToolMember#revoke', function () {
        expect(ToolMember.revoke).toHaveBeenCalledWith({
          id: 564
        });
      });
    });

    describe('#updateParticipantList', function () {
      var $q;

      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_, _ToolMember_, _$q_) {
          subject = _ToolMemberService_;
          ToolMember = _ToolMember_;
          $q = _$q_;
        });

        subject.context = 'alpha';

        spyOn(subject, 'extractId').and.returnValue(10);
        spyOn(ToolMember, 'query').and.returnValue($q.when({}));

        subject.updateParticipantList();
      });

      it('delegates to ToolMember#query', function () {
        expect(ToolMember.query).toHaveBeenCalledWith({
          tool_type: 'alpha',
          tool_id: 10
        });
      });
    });

    describe('#updateInvitableParticipantList', function () {
      var $q;

      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_, _ToolMember_, _$q_) {
          subject = _ToolMemberService_;
          ToolMember = _ToolMember_;
          $q = _$q_;
        });

        subject.context = 'alpha';

        spyOn(subject, 'extractId').and.returnValue(10);
        spyOn(ToolMember, 'invitableMembers').and.returnValue($q.when({}));

        subject.updateInvitableParticipantList();
      });

      it('delegates to ToolMember#invitableMembers', function () {
        expect(ToolMember.invitableMembers).toHaveBeenCalledWith({
          tool_type: 'alpha',
          tool_id: 10
        });
      });
    });

    describe('#createParticipant', function () {
      var $q,
        user = {id: 71},
        roles = [0];

      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_, _ToolMember_, _$q_) {
          subject = _ToolMemberService_;
          ToolMember = _ToolMember_;
          $q = _$q_;
        });

        subject.context = 'alpha';

        spyOn(subject, 'extractId').and.returnValue(10);
        spyOn(ToolMember, 'create').and.returnValue($q.when({}));

        subject.createParticipant(user, roles);
      });

      it('delegates to ToolMember#create', function () {
        expect(ToolMember.create).toHaveBeenCalledWith({
          tool_member: {
            user_id: 71,
            roles: [0],
            tool_type: 'alpha',
            tool_id: 10
          }
        });
      });
    });

    describe('#loadPermissionRequests', function () {
      var $q;

      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_, _ToolMember_, _$q_) {
          subject = _ToolMemberService_;
          ToolMember = _ToolMember_;
          $q = _$q_;
        });

        subject.context = 'alpha';

        spyOn(subject, 'extractId').and.returnValue(10);
        spyOn(ToolMember, 'permissionRequests').and.returnValue($q.when({}));

        subject.loadPermissionRequests();
      });

      it('delegates to ToolMember#permissionRequests', function () {
        expect(ToolMember.permissionRequests).toHaveBeenCalledWith({
          tool_type: 'alpha',
          tool_id: 10
        });
      });
    });

    describe('#denyRequest', function () {
      var $q,
        requestId = 7129;

      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_, _ToolMember_, _$q_) {
          subject = _ToolMemberService_;
          ToolMember = _ToolMember_;
          $q = _$q_;
        });

        subject.context = 'alpha';

        spyOn(subject, 'extractId').and.returnValue(10);
        spyOn(ToolMember, 'deny').and.returnValue($q.when({}));

        subject.denyRequest(requestId);
      });

      it('delegates to ToolMember#deny', function () {
        expect(ToolMember.deny).toHaveBeenCalledWith({
          tool_type: 'alpha',
          tool_id: 10,
          id: 7129
        });
      });
    });

    describe('#grantRequest', function () {
      var $q,
        requestId = 12571;

      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_, _ToolMember_, _$q_) {
          subject = _ToolMemberService_;
          ToolMember = _ToolMember_;
          $q = _$q_;
        });

        subject.context = 'alpha';

        spyOn(subject, 'extractId').and.returnValue(10);
        spyOn(ToolMember, 'grant').and.returnValue($q.when({}));

        subject.grantRequest(requestId);
      });

      it('delegates to ToolMember#grant', function () {
        expect(ToolMember.grant).toHaveBeenCalledWith({
          tool_type: 'alpha',
          tool_id: 10,
          id: 12571
        });
      });
    });

    describe('#requestAccess', function () {
      var $q,
        toolId = 777,
        role = '0';

      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_, _ToolMember_, _$q_) {
          subject = _ToolMemberService_;
          ToolMember = _ToolMember_;
          $q = _$q_;
        });

        subject.context = 'alpha';

        spyOn(subject, 'extractId').and.returnValue(10);
        spyOn(ToolMember, 'requestAccess').and.returnValue($q.when({}));

        subject.requestAccess(toolId, role);
      });

      it('delegates to ToolMember#requestAccess', function () {
        expect(ToolMember.requestAccess).toHaveBeenCalledWith({
          tool_type: 'alpha',
          tool_id: 777
        }, {
          access_request: {
            roles: [
              '0'
            ]
          }
        });
      });
    });

    describe('#loadAllMembers', function () {
      var $q;

      beforeEach(function () {
        module('PDRClient');
        inject(function (_ToolMemberService_, _ToolMember_, _$q_) {
          subject = _ToolMemberService_;
          ToolMember = _ToolMember_;
          $q = _$q_;
        });

        subject.context = 'alpha';

        spyOn(subject, 'extractId').and.returnValue(10);
        spyOn(ToolMember, 'showAll').and.returnValue($q.when({}));

        subject.loadAllMembers();
      });

      it('delegates to ToolMember#showAll', function () {
        expect(ToolMember.showAll).toHaveBeenCalledWith({
          tool_type: 'alpha',
          tool_id: 10
        });
      });
    });

    describe('#sendInvitation', function () {
      var $q,
        UserInvitation,
        AnalysisInvitation,
        InventoryInvitation;

      describe('when the service context is set to assessment', function () {
        var invitedUser = {mocked_data: 'not_indicative_of_actual_code'};

        beforeEach(function () {
          module('PDRClient', function ($provide) {
            $provide.value('$stateParams', {id: 3});
          });

          inject(function (_$q_, _ToolMemberService_, _UserInvitation_, _AnalysisInvitation_, _InventoryInvitation_) {
            subject = _ToolMemberService_;
            UserInvitation = _UserInvitation_;
            AnalysisInvitation = _AnalysisInvitation_;
            InventoryInvitation = _InventoryInvitation_;
            $q = _$q_;
          });

          subject.context = 'assessment';
          spyOn(UserInvitation, 'create').and.returnValue($q.when({}));
          spyOn(InventoryInvitation, 'create').and.returnValue($q.reject({}));
          spyOn(AnalysisInvitation, 'create').and.returnValue($q.reject({}));

          subject.sendInvitation(invitedUser);
        });

        it('delegates to UserInvitation#create', function () {
          expect(UserInvitation.create).toHaveBeenCalledWith({
            assessment_id: 3
          }, {
            mocked_data: 'not_indicative_of_actual_code'
          });
        });

        it('does not delegate to AnalysisInvitation#create', function () {
          expect(AnalysisInvitation.create).not.toHaveBeenCalled();
        });

        it('does not delegate to InventoryInvitation#create', function () {
          expect(InventoryInvitation.create).not.toHaveBeenCalled();
        });
      });

      describe('when the service context is set to analysis', function () {
        var invitedUser = {mocked_data: 'not_indicative_of_actual_code'};

        beforeEach(function () {
          module('PDRClient', function ($provide) {
            $provide.value('$stateParams', {inventory_id: 21, analysis_id: 3});
          });

          inject(function (_$q_, _ToolMemberService_, _UserInvitation_, _AnalysisInvitation_, _InventoryInvitation_) {
            subject = _ToolMemberService_;
            UserInvitation = _UserInvitation_;
            AnalysisInvitation = _AnalysisInvitation_;
            InventoryInvitation = _InventoryInvitation_;
            $q = _$q_;
          });

          subject.context = 'analysis';
          spyOn(UserInvitation, 'create').and.returnValue($q.reject({}));
          spyOn(InventoryInvitation, 'create').and.returnValue($q.reject({}));
          spyOn(AnalysisInvitation, 'create').and.returnValue($q.when({}));

          subject.sendInvitation(invitedUser);
        });

        it('delegates to AnalysisInvitation#create', function () {
          expect(AnalysisInvitation.create).toHaveBeenCalledWith({
            inventory_id: 21,
            analysis_id: 3
          }, {
            mocked_data: 'not_indicative_of_actual_code'
          });
        });

        it('does not delegate to UserInvitation#create', function () {
          expect(UserInvitation.create).not.toHaveBeenCalled();
        });

        it('does not delegate to InventoryInvitation#create', function () {
          expect(InventoryInvitation.create).not.toHaveBeenCalled();
        });
      });

      describe('when the service context is set to inventory', function () {
        var invitedUser = {mocked_data: 'not_indicative_of_actual_code'};

        beforeEach(function () {
          module('PDRClient', function ($provide) {
            $provide.value('$stateParams', {inventory_id: 675});
          });

          inject(function (_$q_, _ToolMemberService_, _UserInvitation_, _AnalysisInvitation_, _InventoryInvitation_) {
            subject = _ToolMemberService_;
            UserInvitation = _UserInvitation_;
            AnalysisInvitation = _AnalysisInvitation_;
            InventoryInvitation = _InventoryInvitation_;
            $q = _$q_;
          });

          subject.context = 'inventory';
          spyOn(UserInvitation, 'create').and.returnValue($q.reject({}));
          spyOn(InventoryInvitation, 'create').and.returnValue($q.when({}));
          spyOn(AnalysisInvitation, 'create').and.returnValue($q.reject({}));

          subject.sendInvitation(invitedUser);
        });

        it('delegates to InventoryInvitation#create', function () {
          expect(InventoryInvitation.create).toHaveBeenCalledWith({
            inventory_id: 675
          }, {
            mocked_data: 'not_indicative_of_actual_code'
          });
        });

        it('does not delegate to UserInvitation#create', function () {
          expect(UserInvitation.create).not.toHaveBeenCalled();
        });

        it('does not delegate to AnalysisInvitation#create', function () {
          expect(AnalysisInvitation.create).not.toHaveBeenCalled();
        });
      });

      describe('when the service context is malformed', function () {
        beforeEach(function () {
          module('PDRClient', function ($provide) {
            $provide.value('$stateParams', {});
          });

          inject(function (_$q_, _ToolMemberService_, _UserInvitation_, _AnalysisInvitation_, _InventoryInvitation_) {
            subject = _ToolMemberService_;
            UserInvitation = _UserInvitation_;
            AnalysisInvitation = _AnalysisInvitation_;
            InventoryInvitation = _InventoryInvitation_;
            $q = _$q_;
          });

          subject.context = '';
          spyOn(UserInvitation, 'create').and.returnValue($q.reject({}));
          spyOn(InventoryInvitation, 'create').and.returnValue($q.reject({}));
          spyOn(AnalysisInvitation, 'create').and.returnValue($q.reject({}));

          subject.sendInvitation({});
        });

        it('does not delegate to InventoryInvitation#create', function () {
          expect(InventoryInvitation.create).not.toHaveBeenCalled();
        });

        it('does not delegate to UserInvitation#create', function () {
          expect(UserInvitation.create).not.toHaveBeenCalled();
        });

        it('does not delegate to AnalysisInvitation#create', function () {
          expect(AnalysisInvitation.create).not.toHaveBeenCalled();
        });
      });
    });
  });
})();