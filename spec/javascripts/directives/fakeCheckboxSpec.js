(function() {
  'use strict';

  describe('Directive: fakeCheckbox', function() {
    var $scope,
        $compile,
        element,
        isolatedScope;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new(true);
      });
    });

    describe('displays checkbox correctly', function () {
      it('when model is false', function() {
        $scope.selected = false;

        element = angular.element('<fake-checkbox model="selected"></fake-checkbox>');
        $compile(element)($scope);
        $scope.$digest();

        isolatedScope = element.isolateScope();

        expect(isolatedScope.model).toBe(false);
        expect(element.find('input').is(':checked')).toBe(false);
      });

      it('when model is true', function() {
        $scope.selected = true;

        element = angular.element('<fake-checkbox model="selected"></fake-checkbox>');
        $compile(element)($scope);
        $scope.$digest();

        isolatedScope = element.isolateScope();

        expect(isolatedScope.model).toBe(true);
        expect(element.find('input').is(':checked')).toBe(true);
      });
    });

    describe('toggles model', function () {
      it('when checking the checkbox', function() {
        $scope.selected = false;

        element = angular.element('<fake-checkbox model="selected"></fake-checkbox>');
        $compile(element)($scope);
        $scope.$digest();

        isolatedScope = element.isolateScope();

        element.find('input').trigger('click');

        expect(isolatedScope.model).toBe(true);
        expect($scope.selected).toBe(true);
        expect(element.find('input').is(':checked')).toBe(true);
      });

      it('when unchecking the checkbox', function() {
        $scope.selected = true;

        element = angular.element('<fake-checkbox model="selected"></fake-checkbox>');
        $compile(element)($scope);
        $scope.$digest();

        isolatedScope = element.isolateScope();

        element.find('input').trigger('click');

        expect(isolatedScope.model).toBe(false);
        expect($scope.selected).toBe(false);
        expect(element.find('input').is(':checked')).toBe(false);
      });
    });
  });
})();
