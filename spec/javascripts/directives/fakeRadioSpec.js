(function() {
  'use strict';

  describe('Directive: fakeRadio', function() {
    var $scope,
        $compile,
        element1,
        element2,
        isolatedScope1,
        isolatedScope2;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new(true);

        $scope.selected = 'foo';

        element1 = angular.element('<fake-radio model="selected" value="foo"></fake-radio>');
        element2 = angular.element('<fake-radio model="selected" value="bar"></fake-radio>');
        $compile(element1)($scope);
        $compile(element2)($scope);
        $scope.$digest();

        isolatedScope1 = element1.isolateScope();
        isolatedScope2 = element2.isolateScope();
      });
    });

    it('displays radio button collection correctly', function () {
      expect(isolatedScope1.model).toBe('foo');
      expect(isolatedScope2.model).toBe('foo');
      expect(element1.find('input').is(':checked')).toBe(true);
      expect(element2.find('input').is(':checked')).toBe(false);
    });

    it('updates model correctly', function () {
      element2.find('input').click().trigger('click');

      expect(isolatedScope1.model).toBe('bar');
      expect(isolatedScope2.model).toBe('bar');
      expect($scope.selected).toBe('bar');
      expect(element1.find('input').is(':checked')).toBe(false);
      expect(element2.find('input').is(':checked')).toBe(true);
    });
  });
})();
