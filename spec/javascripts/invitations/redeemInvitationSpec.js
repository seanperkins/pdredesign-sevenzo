(function () {
  'use strict';

  describe('Directive: redeemInvitation', function () {
    var element,
      rootScope,
      compile,
      InvitationService;

    beforeEach(function () {
      module('PDRClient');
      module('templates');
      inject(function (_$rootScope_, _$compile_, _InvitationService_) {
        rootScope = _$rootScope_;
        compile = _$compile_;
        InvitationService = _InvitationService_;
      });
    });

    describe('at all times', function () {
      var template = '<redeem-invitation></redeem-invitation>';

      beforeEach(function () {
        spyOn(InvitationService, 'getInvitedUser').and.returnValue({});
        element = compile(template)(rootScope);
        rootScope.$digest();
      });

      describe('in the form', function () {
        var scope,
          button;

        beforeEach(function () {
          button = element.find('button')[0];
          scope = element.isolateScope();
        });

        describe('when the first name is missing from the form', function () {
          beforeEach(function () {
            scope.invitation.firstName.$setViewValue('');
            scope.invitation.lastName.$setViewValue('User');
            scope.invitation.email.$setViewValue('testuser@example.com');
            scope.invitation.password.$setViewValue('testuser12345');
            scope.invitation.passwordConfirm.$setViewValue('testuser12345');

            rootScope.$digest();
          });

          it('contains only one error', function () {
            expect(scope.invitation.$error['required'].length).toEqual(1);
          });

          it('marks the form as invalid', function () {
            expect(scope.invitation.$invalid).toBe(true);
          });

          it('disables the submission button', function () {
            expect(button.attributes['disabled'].value).toEqual('disabled');
          });
        });

        describe('when the last name is missing from the form', function () {
          beforeEach(function () {
            scope.invitation.firstName.$setViewValue('Test');
            scope.invitation.lastName.$setViewValue('');
            scope.invitation.email.$setViewValue('testuser@example.com');
            scope.invitation.password.$setViewValue('testuser12345');
            scope.invitation.passwordConfirm.$setViewValue('testuser12345');

            rootScope.$digest();
          });

          it('contains only one error', function () {
            expect(scope.invitation.$error['required'].length).toEqual(1);
          });

          it('marks the form as invalid', function () {
            expect(scope.invitation.$invalid).toBe(true);
          });

          it('disables the submission button', function () {
            expect(button.attributes['disabled'].value).toEqual('disabled');
          });
        });

        describe('when the email is missing from the form', function () {
          beforeEach(function () {
            scope.invitation.firstName.$setViewValue('Test');
            scope.invitation.lastName.$setViewValue('User');
            scope.invitation.email.$setViewValue('');
            scope.invitation.password.$setViewValue('testuser12345');
            scope.invitation.passwordConfirm.$setViewValue('testuser12345');

            rootScope.$digest();
          });

          it('contains only one error', function () {
            expect(scope.invitation.$error['required'].length).toEqual(1);
          });

          it('marks the form as invalid', function () {
            expect(scope.invitation.$invalid).toBe(true);
          });

          it('disables the submission button', function () {
            expect(button.attributes['disabled'].value).toEqual('disabled');
          });
        });

        describe('when the password is missing from the form', function () {
          beforeEach(function () {
            scope.invitation.firstName.$setViewValue('Test');
            scope.invitation.lastName.$setViewValue('User');
            scope.invitation.email.$setViewValue('testuser@example.com');
            scope.invitation.password.$setViewValue('');
            scope.invitation.passwordConfirm.$setViewValue('testuser12345');

            rootScope.$digest();
          });

          it('contains only one error', function () {
            expect(scope.invitation.$error['required'].length).toEqual(1);
          });

          it('marks the form as invalid', function () {
            expect(scope.invitation.$invalid).toBe(true);
          });

          it('disables the submission button', function () {
            expect(button.attributes['disabled'].value).toEqual('disabled');
          });
        });

        describe('when the password confirmation is missing from the form', function () {
          beforeEach(function () {
            scope.invitation.firstName.$setViewValue('Test');
            scope.invitation.lastName.$setViewValue('User');
            scope.invitation.email.$setViewValue('testuser@example.com');
            scope.invitation.password.$setViewValue('testuser12345');
            scope.invitation.passwordConfirm.$setViewValue('');

            rootScope.$digest();
          });

          it('contains only one error', function () {
            expect(scope.invitation.$error['required'].length).toEqual(1);
          });

          it('marks the form as invalid', function () {
            expect(scope.invitation.$invalid).toBe(true);
          });

          it('disables the submission button', function () {
            expect(button.attributes['disabled'].value).toEqual('disabled');
          });
        });

        describe('when the form is entirely blank', function () {
          beforeEach(function () {
            scope.invitation.firstName.$setViewValue('');
            scope.invitation.lastName.$setViewValue('');
            scope.invitation.email.$setViewValue('');
            scope.invitation.password.$setViewValue('');
            scope.invitation.passwordConfirm.$setViewValue('');

            rootScope.$digest();
          });

          it('contains five errors', function () {
            expect(scope.invitation.$error['required'].length).toEqual(5);
          });

          it('marks the form as invalid', function () {
            expect(scope.invitation.$invalid).toBe(true);
          });

          it('disables the submission button', function () {
            expect(button.attributes['disabled'].value).toEqual('disabled');
          });
        });

        describe('when the password and password confirmation fields are not the same', function () {
          beforeEach(function () {
            scope.invitation.firstName.$setViewValue('Test');
            scope.invitation.lastName.$setViewValue('User');
            scope.invitation.email.$setViewValue('testuser@example.com');
            scope.invitation.password.$setViewValue('testuser12345');
            scope.invitation.passwordConfirm.$setViewValue('testuser123456');

            rootScope.$digest();
          });

          it('contains only one error', function () {
            expect(scope.invitation.$error['validator'].length).toEqual(1);
          });

          it('marks the form as invalid', function () {
            expect(scope.invitation.$invalid).toBe(true);
          });

          it('disables the submission button', function () {
            expect(button.attributes['disabled'].value).toEqual('disabled');
          });
        });

        describe('when everything is valid and filled in', function () {
          beforeEach(function () {
            scope.invitation.firstName.$setViewValue('Test');
            scope.invitation.lastName.$setViewValue('User');
            scope.invitation.email.$setViewValue('testuser@example.com');
            scope.invitation.password.$setViewValue('testuser12345');
            scope.invitation.passwordConfirm.$setViewValue('testuser12345');

            rootScope.$digest();
          });

          it('marks the form as valid', function () {
            expect(scope.invitation.$valid).toBe(true);
          });

          it('enabled the submission button', function () {
            expect(button.attributes['disabled']).toBeUndefined();
          });
        });
      });

      describe('when an alert message is present', function () {
        var scope;

        beforeEach(function () {
          scope = element.isolateScope();

          scope.vm.alerts = [{type: 'info', msg: 'This is informational!'}];
          rootScope.$digest();
        });

        it('displays the alert directive', function () {
          expect(element.find('.alert').length).toEqual(1);
        });

        describe('when the alert is dismissed', function () {
          beforeEach(function () {
            element.find('.alert').find('button').trigger('click');
          });

          it('does not display any alerts', function () {
            expect(element.find('.alert').length).toEqual(0);
          });
        });
      });
    });

    describe('when a token is present', function () {
      var template = '<redeem-invitation token="test-token"></redeem-invitation>',
        SessionService,
        scope,
        $q,
        $state;

      beforeEach(function () {
        inject(function (_$state_, _$q_, _SessionService_) {
          $state = _$state_;
          $q = _$q_;
          SessionService = _SessionService_;
        });
      });

      describe('when the invitation is successfully saved', function () {
        beforeEach(function () {
          spyOn($state, 'go');
          spyOn(SessionService, 'syncUser').and.returnValue($q.when());
          spyOn(InvitationService, 'saveInvitation').and.returnValue($q.when());
          spyOn(SessionService, 'authenticate').and.returnValue($q.when());
        });

        describe('when the invitation contains an inventory ID', function () {
          var invitedUser = {
            email: 'foo@example.com',
            password: 'test_password',
            inventory_id: 1
          };

          beforeEach(function () {
            spyOn(InvitationService, 'getInvitedUser').and.returnValue(invitedUser);
            element = compile(template)(rootScope);
            rootScope.$digest();

            scope = element.isolateScope();
            scope.invitation.firstName.$setViewValue('Test');
            scope.invitation.lastName.$setViewValue('User');
            scope.invitation.email.$setViewValue('testuser@example.com');
            scope.invitation.password.$setViewValue('testuser12345');
            scope.invitation.passwordConfirm.$setViewValue('testuser12345');
            rootScope.$digest();

            element.find('button').trigger('click');
          });

          it('saves the invitation', function () {
            expect(InvitationService.saveInvitation).toHaveBeenCalledWith('test-token', invitedUser);
          });

          it('authenticates the user', function () {
            expect(SessionService.authenticate).toHaveBeenCalledWith(invitedUser.email, invitedUser.password);
          });

          it('syncs the user', function () {
            expect(SessionService.syncUser).toHaveBeenCalled();
          });

          it('navigates to the inventory report page', function () {
            expect($state.go).toHaveBeenCalledWith('inventories_report', {inventory_id: invitedUser.inventory_id});
          });
        });

        describe('when the invitation contains an analysis ID', function () {
          var invitedUser = {
            email: 'foo@example.com',
            password: 'test_password',
            inventory_id: 1,
            analysis_id: 1
          };

          beforeEach(function () {
            spyOn(InvitationService, 'getInvitedUser').and.returnValue(invitedUser);
            element = compile(template)(rootScope);
            rootScope.$digest();

            scope = element.isolateScope();
            scope.invitation.firstName.$setViewValue('Test');
            scope.invitation.lastName.$setViewValue('User');
            scope.invitation.email.$setViewValue('testuser@example.com');
            scope.invitation.password.$setViewValue('testuser12345');
            scope.invitation.passwordConfirm.$setViewValue('testuser12345');
            rootScope.$digest();

            element.find('button').trigger('click');
          });

          it('saves the invitation', function () {
            expect(InvitationService.saveInvitation).toHaveBeenCalledWith('test-token', invitedUser);
          });

          it('authenticates the user', function () {
            expect(SessionService.authenticate).toHaveBeenCalledWith(invitedUser.email, invitedUser.password);
          });

          it('syncs the user', function () {
            expect(SessionService.syncUser).toHaveBeenCalled();
          });

          it('navigates to the inventory analysis dashboard page', function () {
            expect($state.go).toHaveBeenCalledWith('inventory_analysis_dashboard', {
              inventory_id: invitedUser.inventory_id,
              id: invitedUser.analysis_id
            });
          });
        });

        describe('when the invitation contains an assessment ID', function () {
          var invitedUser = {
            email: 'foo@example.com',
            password: 'test_password',
            assessment_id: 1
          };

          beforeEach(function () {
            spyOn(InvitationService, 'getInvitedUser').and.returnValue(invitedUser);
            element = compile(template)(rootScope);
            rootScope.$digest();

            scope = element.isolateScope();
            scope.invitation.firstName.$setViewValue('Test');
            scope.invitation.lastName.$setViewValue('User');
            scope.invitation.email.$setViewValue('testuser@example.com');
            scope.invitation.password.$setViewValue('testuser12345');
            scope.invitation.passwordConfirm.$setViewValue('testuser12345');
            rootScope.$digest();

            element.find('button').trigger('click');
          });

          it('saves the invitation', function () {
            expect(InvitationService.saveInvitation).toHaveBeenCalledWith('test-token', invitedUser);
          });

          it('authenticates the user', function () {
            expect(SessionService.authenticate).toHaveBeenCalledWith(invitedUser.email, invitedUser.password);
          });

          it('syncs the user', function () {
            expect(SessionService.syncUser).toHaveBeenCalled();
          });

          it('navigates to the response create page', function () {
            expect($state.go).toHaveBeenCalledWith('response_create', {assessment_id: invitedUser.assessment_id});
          });
        });

        describe('when the invitation does not contain a supported tool ID', function () {
          var invitedUser = {
            email: 'foo@example.com',
            password: 'test_password'
          };

          beforeEach(function () {
            spyOn(InvitationService, 'getInvitedUser').and.returnValue(invitedUser);
            element = compile(template)(rootScope);
            rootScope.$digest();

            scope = element.isolateScope();
            scope.invitation.firstName.$setViewValue('Test');
            scope.invitation.lastName.$setViewValue('User');
            scope.invitation.email.$setViewValue('testuser@example.com');
            scope.invitation.password.$setViewValue('testuser12345');
            scope.invitation.passwordConfirm.$setViewValue('testuser12345');
            rootScope.$digest();

            element.find('button').trigger('click');
          });

          it('saves the invitation', function () {
            expect(InvitationService.saveInvitation).toHaveBeenCalledWith('test-token', invitedUser);
          });

          it('authenticates the user', function () {
            expect(SessionService.authenticate).toHaveBeenCalledWith(invitedUser.email, invitedUser.password);
          });

          it('syncs the user', function () {
            expect(SessionService.syncUser).toHaveBeenCalled();
          });

          it('adds an error notice to the DOM', function () {
            expect(element.find('.alert').length).toEqual(1);
          });
        })
      });

      describe('when the invitation is not successfully saved', function () {
        var invitedUser = {
          email: 'foo@example.com',
          password: 'test_password',
          assessment_id: 1
        };

        beforeEach(function () {
          spyOn(InvitationService, 'getInvitedUser').and.returnValue(invitedUser);
          spyOn(InvitationService, 'saveInvitation').and.returnValue($q.reject({
            data: {
              errors: [{foo: 'bar'}, {baz: 'bing'}]
            }
          }));
          element = compile(template)(rootScope);
          rootScope.$digest();

          scope = element.isolateScope();
          scope.invitation.firstName.$setViewValue('Test');
          scope.invitation.lastName.$setViewValue('User');
          scope.invitation.email.$setViewValue('testuser@example.com');
          scope.invitation.password.$setViewValue('testuser12345');
          scope.invitation.passwordConfirm.$setViewValue('testuser12345');
          rootScope.$digest();

          element.find('button').trigger('click');
        });

        it('attempts to save the invitation', function () {
          expect(InvitationService.saveInvitation).toHaveBeenCalledWith('test-token', invitedUser);
        });

        it('generates alerts on screen', function () {
          expect(element.find('.alert').length).toEqual(2);
        });
      });
    });
  });
})();
