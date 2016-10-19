(function () {
  'use strict';

  describe('Directive: accessRequests', function () {
    var element,
      scope,
      compile,
      ToolMemberService,
      $window;

    beforeEach(function () {
      module('PDRClient', function ($provide) {
        $provide.factory('permissionsInfoDirective', function () {
          return {};
        });
      });

      inject(function (_$rootScope_, _$compile_, _$window_, _ToolMemberService_) {
        scope = _$rootScope_.$new(true);
        compile = _$compile_;
        $window = _$window_;
        ToolMemberService = _ToolMemberService_;
      });

      spyOn(ToolMemberService, 'setContext');
    });

    describe('on initialization', function () {
      beforeEach(function () {
        spyOn(ToolMemberService, 'loadPermissionRequests');

        var template = '<access-requests context="foo"></access-requests>';
        element = compile(template)(scope);
        scope.$digest();
      });

      it('loads the context', function () {
        expect(ToolMemberService.setContext).toHaveBeenCalledWith('foo');
      });

      it('loads permission requests', function () {
        expect(ToolMemberService.loadPermissionRequests).toHaveBeenCalled();
      });

      it('sets the permissionsInfo placement to the right', function () {
        expect(element.find('permissions-info').attr('placement')).toEqual('right');
      });
    });

    describe('when no requests exist', function () {
      beforeEach(function () {
        spyOn(ToolMemberService, 'loadPermissionRequests').and.returnValue([]);

        var template = '<access-requests context="foo"></access-requests>';
        element = compile(template)(scope);
        scope.$digest();
      });

      it('displays the appropriate message', function () {
        expect(element.find('h5').text()).toEqual('No Permission Requests');
      });
    });

    describe('when a request exists', function () {
      var requesters = [
        {
          access_request_id: 124,
          avatar: '/path/to/avatar',
          full_name: 'John Doe',
          email: 'john@example.com',
          current_permission_levels: {
            roles: ['facilitator']
          },
          requested_permission_levels: {
            roles: ['facilitator', 'participant']
          }
        }
      ];

      beforeEach(function () {
        spyOn(ToolMemberService, 'loadPermissionRequests').and.returnValue(requesters);

        var template = '<access-requests context="foo"></access-requests>';
        element = compile(template)(scope);
        scope.$digest();
      });

      it('binds the avatar correctly', function () {
        expect(element.find('img').attr('src')).toEqual('/path/to/avatar');
      });

      it('binds the name correctly', function () {
        expect(element.find('.name_label').text()).toEqual('John Doe');
      });

      it('binds the email correctly', function () {
        expect(element.find('.info').text()).toEqual('john@example.com');
      });

      it('binds the old levels correctly', function () {
        expect(element.find('.old_level').text()).toEqual('["facilitator"]');
      });

      it('binds the new levels correctly', function () {
        expect(element.find('.new_level').text()).toEqual('["facilitator","participant"]');
      });
    });
  });
})();