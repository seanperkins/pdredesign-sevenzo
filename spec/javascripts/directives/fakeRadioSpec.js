(function() {
  'use strict';

  describe('Directive: fakeRadio', function () {
    var $scope,
        $compile,
        element1,
        element2,
        isolatedScope1,
        isolatedScope2;

    beforeEach(function () {
      module('PDRClient');
      inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new(true);
      });
    });

    describe('with normal value', function () {
      beforeEach(function () {
        $scope.selected = 'foo';

        element1 = angular.element('<fake-radio proxy-ng-model="selected" proxy-value="foo"></fake-radio>');
        element2 = angular.element('<fake-radio proxy-ng-model="selected" proxy-value="bar"></fake-radio>');
        $compile(element1)($scope);
        $compile(element2)($scope);
        $scope.$digest();

        isolatedScope1 = element1.isolateScope();
        isolatedScope2 = element2.isolateScope();
      });

      it('displays radio button collection correctly', function () {
        expect(isolatedScope1.proxyNgModel).toBe('foo');
        expect(isolatedScope2.proxyNgModel).toBe('foo');
        expect(element1.find('input').is(':checked')).toBe(true);
        expect(element2.find('input').is(':checked')).toBe(false);
      });

      it('updates model correctly', function () {
        element2.find('input').click().trigger('click');

        expect(isolatedScope1.proxyNgModel).toBe('bar');
        expect(isolatedScope2.proxyNgModel).toBe('bar');
        expect($scope.selected).toBe('bar');
        expect(element1.find('input').is(':checked')).toBe(false);
        expect(element2.find('input').is(':checked')).toBe(true);
      });
    });

    describe('with ng-value', function () {
      beforeEach(function () {
        $scope.selected = 10;

        element1 = angular.element('<fake-radio proxy-ng-model="selected" proxy-ng-value="10"></fake-radio>');
        element2 = angular.element('<fake-radio proxy-ng-model="selected" proxy-ng-value="null"></fake-radio>');
        $compile(element1)($scope);
        $compile(element2)($scope);
        $scope.$digest();

        isolatedScope1 = element1.isolateScope();
        isolatedScope2 = element2.isolateScope();
      });

      it('displays radio button collection correctly', function () {
        expect(isolatedScope1.proxyNgModel).toBe(10);
        expect(isolatedScope2.proxyNgModel).toBe(10);
        expect(element1.find('input').is(':checked')).toBe(true);
        expect(element2.find('input').is(':checked')).toBe(false);
      });

      it('updates model correctly', function () {
        element2.find('input').click().trigger('click');

        expect(isolatedScope1.proxyNgModel).toBe(null);
        expect(isolatedScope2.proxyNgModel).toBe(null);
        expect($scope.selected).toBe(null);
        expect(element1.find('input').is(':checked')).toBe(false);
        expect(element2.find('input').is(':checked')).toBe(true);
      });
    });
  });
})();
