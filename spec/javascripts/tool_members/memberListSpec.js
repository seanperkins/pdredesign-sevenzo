(function () {
  'use strict';

  describe('Directive: memberList', function () {
    var compile,
      rootScope,
      element;

    beforeEach(function () {
      module('templates');
      module('PDRClient', function ($provide) {
        $provide.factory('participantDirective', function () {
          return {};
        });
      });

      inject(function (_$compile_, _$rootScope_) {
        compile = _$compile_;
        rootScope = _$rootScope_;
      });

      var template = '<member-list members="members"></member-list>';
      element = compile(template)(rootScope);
      rootScope.$digest();
    });

    describe('with no members present', function () {
      beforeEach(function () {
        var scope = element.isolateScope();
        scope.members = [];
        rootScope.$digest();
      });

      it('displays "no participants" in the header', function () {
        expect(element.find('h2').text()).toEqual('No Participants');
      });

      it('does not list any participants', function () {
        expect(element.find('participant').length).toEqual(0);
      });
    });

    describe('with one member present', function () {
      beforeEach(function () {
        var scope = element.isolateScope();
        scope.members = ['mocked-dummy-data-not-indicative-of-prod'];
        rootScope.$digest();
      });

      it('displays "1 Participant" in the header', function () {
        expect(element.find('h2').text()).toEqual('1 Participant');
      });

      it('lists the single participant', function () {
        expect(element.find('participant').length).toEqual(1);
      });
    });

    describe('with more than one member present', function () {
      beforeEach(function () {
        var scope = element.isolateScope();
        scope.members = ['mocked-dummy-data', 'not-indicative-of-prod'];
        rootScope.$digest();
      });

      it('displays "2 Participants" in the header', function () {
        expect(element.find('h2').text()).toEqual('2 Participants');
      });

      it('lists the single participant', function () {
        expect(element.find('participant').length).toEqual(2);
      });
    });
  });
})();