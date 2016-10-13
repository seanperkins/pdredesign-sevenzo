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
  });
})();