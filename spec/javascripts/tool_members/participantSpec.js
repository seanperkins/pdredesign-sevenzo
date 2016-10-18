(function () {
  'use strict';

  describe('Directive: participant', function () {
    var compile,
      rootScope,
      element,
      user = {
        avatar: 'avatar-dummy-data',
        full_name: 'John Doe',
        email: 'john@example.com',
        status_date: '2016-12-25T00:00:00'
      };

    beforeEach(function () {
      module('templates');
      module('angularMoment');
      module('PDRClient', function ($provide) {
        $provide.factory('avatarDirective', function () {
          return {};
        });

        $provide.factory('responseStatusDirective', function () {
          return {};
        });
      });

      inject(function (_$compile_, _$rootScope_) {
        compile = _$compile_;
        rootScope = _$rootScope_;
      });

      var template = '<participant user="user"></participant>';
      rootScope.user = user;
      element = compile(template)(rootScope);
      rootScope.$digest();
    });

    describe('at all times', function () {
      it('binds the full name', function () {
        expect(element.find('.name').text()).toEqual('John Doe');
      });

      it('binds the email', function () {
        expect(element.find('.email').text()).toEqual('john@example.com');
      });

      it('binds and formats the date correctly', function () {
        expect(element.find('.date').text()).toEqual('December 25th, 2016');
      });
    });

    describe('in context of the avatar directive', function () {
      it('passes the avatar field to the avatar directive', function () {
        expect(element.find('avatar')[0].attributes['avatar'].value).toEqual('avatar-dummy-data');
      });

      it('sets the width of the avatar correctly', function () {
        expect(element.find('avatar')[0].attributes['data-width'].value).toEqual('75%');
      });
    });

    describe('in context of the responseStatus directive', function () {
      it('binds the user value to the directive', function () {
        expect(element.find('response-status')[0].attributes['user'].value).toEqual('user');
      });
    });
  });
})();