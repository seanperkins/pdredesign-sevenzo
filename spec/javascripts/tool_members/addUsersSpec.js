(function () {
  'use strict';

  describe('Directive: addUsers', function () {
    var scope,
      rootScope,
      compile,
      $q,
      ToolMemberService,
      element,
      template;

    beforeEach(function () {
      module('PDRClient');
      inject(function (_$rootScope_, _$compile_, _$q_, _ToolMemberService_) {
        rootScope = _$rootScope_;
        scope = _$rootScope_.$new(true);
        compile = _$compile_;
        $q = _$q_;
        ToolMemberService = _ToolMemberService_;
      });
    });

    describe('on initialization', function () {
      describe('in the standard case', function () {
        beforeEach(function () {
          template = '<add-users context="foo"></add-users>';
          spyOn(ToolMemberService, 'setContext');
          spyOn(ToolMemberService, 'updateInvitableParticipantList').and.returnValue($q.when([]));

          spyOn(rootScope, '$broadcast').and.callThrough();
          element = compile(template)(scope);
          rootScope.$digest();
        });

        it('sets the context', function () {
          expect(ToolMemberService.setContext).toHaveBeenCalledWith('foo');
        });

        it('invokes ToolMemberService#updateInvitableParticipantList', function () {
          expect(ToolMemberService.updateInvitableParticipantList).toHaveBeenCalled();
        });

        it('broadcasts start_change', function () {
          expect(rootScope.$broadcast).toHaveBeenCalledWith('start_change');
        });
      });

      describe('when the participant list comes back as successful', function () {
        beforeEach(function () {
          template = '<add-users context="foo"></add-users>';
          spyOn(ToolMemberService, 'setContext');
          spyOn(ToolMemberService, 'updateInvitableParticipantList').and.returnValue($q.when(['foo', 'bar', 'baz']));

          spyOn(rootScope, '$broadcast').and.callThrough();
          element = compile(template)(scope);
          rootScope.$digest();
        });

        it('broadcasts success_change', function () {
          expect(rootScope.$broadcast).toHaveBeenCalledWith('success_change');
        });

        it('populates the invitables list', function () {
          expect(element.isolateScope().vm.invitables).toEqual(['foo', 'bar', 'baz']);
        });
      });

      describe('when the participant list comes back as unsuccessful', function () {
        beforeEach(function () {
          template = '<add-users context="foo"></add-users>';
          spyOn(ToolMemberService, 'setContext');
          spyOn(ToolMemberService, 'updateInvitableParticipantList').and.returnValue($q.reject([]));

          spyOn(rootScope, '$broadcast').and.callThrough();
          element = compile(template)(scope);
          rootScope.$digest();
        });

        it('broadcasts success_change', function () {
          expect(rootScope.$broadcast).toHaveBeenCalledWith('success_change');
        });

        it('does not populate the invitables list', function () {
          expect(element.isolateScope().vm.invitables).toBeUndefined();
        });
      });
    });

    describe('when loading elements in the DOM', function () {
      describe('when no users are loaded in', function () {
        var users = [];

        beforeEach(function () {
          template = '<add-users context="foo"></add-users>';
          spyOn(ToolMemberService, 'setContext');
          spyOn(ToolMemberService, 'updateInvitableParticipantList').and.returnValue($q.when(users));

          spyOn(rootScope, '$broadcast').and.callThrough();
          element = compile(template)(scope);
          rootScope.$digest();
        });

        it('does not list any elements', function () {
          expect(element.find('.participantholder').children().length).toEqual(0);
        });
      });

      describe('when users are loaded in', function () {
        var users = [
          {full_name: 'John Doe', email: 'john@example.com', avatar: '/path/to/avatar'}
        ];

        beforeEach(function () {
          template = '<add-users context="foo"></add-users>';
          spyOn(ToolMemberService, 'setContext');
          spyOn(ToolMemberService, 'updateInvitableParticipantList').and.returnValue($q.when(users));

          spyOn(rootScope, '$broadcast').and.callThrough();
          element = compile(template)(scope);
          rootScope.$digest();
        });

        it('does list the element', function () {
          expect(element.find('.participantholder').children().length).toEqual(1);
        });

        it('binds the user avatar appropriately', function () {
          expect(element.find('img').attr('src')).toEqual('/path/to/avatar');
        });

        it('binds the user name appropriately', function () {
          expect(element.find('.name').text()).toEqual('John Doe');
        });

        it('binds the user email appropriately', function () {
          expect(element.find('.info').text()).toEqual('john@example.com');
        });

        describe('when clicking on the "Add" button', function () {
          beforeEach(function () {
            spyOn(ToolMemberService, 'createParticipant').and.returnValue($q.when({}));
            spyOn(element.isolateScope(), '$emit').and.callThrough();

            element.find('.btn').trigger('click');
          });

          it('invokes ToolMemberService#createParticipant', function () {
            var firstArg = ToolMemberService.createParticipant.calls.argsFor(0)[0];
            var secondArg = ToolMemberService.createParticipant.calls.argsFor(0)[1];
            expect(firstArg.full_name).toEqual('John Doe');
            expect(firstArg.email).toEqual('john@example.com');
            expect(firstArg.avatar).toEqual('/path/to/avatar');
            expect(firstArg.avatar).toEqual('/path/to/avatar');
            expect(secondArg).toEqual([1]);
          });

          it('broadcasts update_participants', function () {
            expect(rootScope.$broadcast).toHaveBeenCalledWith('update_participants');
          });

          it('emits close-add-participants', function () {
            expect(element.isolateScope().$emit).toHaveBeenCalledWith('close-add-participants');
          });
        });
      })
    });
  });
})();
