(function () {
  'use strict';

  describe('Directive: redeemInvitation', function () {
    var element,
      rootScope,
      compile,
      InvitationService;

    beforeEach(function () {
      module('PDRClient');
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
    });
  });
})();
