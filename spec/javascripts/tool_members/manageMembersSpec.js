(function () {
  'use strict';

  describe('Directive: manageMembers', function () {
    var scope,
      compile,
      element;

    beforeEach(function () {
      module('PDRClient', function($provide) {
        $provide.factory('addUsersLinkDirective', function () {
          return {};
        });

        $provide.factory('managePermissionsLinkDirective', function () {
          return {};
        });

        $provide.factory('inviteUserLinkDirective', function () {
          return {};
        });
      });

      inject(function (_$rootScope_, _$compile_) {
        scope = _$rootScope_.$new(true);
        compile = _$compile_;
      });

      var template = '<manage-members context="foo-context"></manage-members>';
      element = compile(template)(scope);
      scope.$digest();
    });

    it('binds the context to the addUsersLink directive', function () {
      expect(element.find('add-users-link').attr('context')).toEqual('foo-context');
    });

    it('binds the context to the managePermissionsLink directive', function () {
      expect(element.find('manage-permissions-link').attr('context')).toEqual('foo-context');
    });

    it('binds the context to the inviteUserLink directive', function () {
      expect(element.find('invite-user-link').attr('context')).toEqual('foo-context');
    });
  });
})();