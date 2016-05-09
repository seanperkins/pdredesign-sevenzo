(function() {
  'use strict';

  describe('Directive: searchableList', function() {
    var $scope,
        $compile,
        element,
        isolatedScope;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new(true);

        element = angular.element('<searchable-list><div>foo</div><div>bar</div><div>foobar</div></searchable-list>');
        document.body.appendChild(element[0]);
        
        $compile(element)($scope);
        $scope.$digest();

        isolatedScope = element.isolateScope();
      });
    });

    afterEach(function () {
      document.body.removeChild(element[0]);
    });

    describe('search', function () {
      it('hides as it searches', function () {
        expect(element.find('.list div:visible').length).toBe(3);
        expect(element.find('.list div:nth-child(1)').is(':visible')).toBe(true);
        expect(element.find('.list div:nth-child(2)').is(':visible')).toBe(true);
        expect(element.find('.list div:nth-child(3)').is(':visible')).toBe(true);

        element.find('.search').val('foo').trigger('input');
        expect(element.find('.list div:visible').length).toBe(2);
        expect(element.find('.list div:nth-child(1)').is(':visible')).toBe(true);
        expect(element.find('.list div:nth-child(2)').is(':visible')).toBe(false);
        expect(element.find('.list div:nth-child(3)').is(':visible')).toBe(true);

        element.find('.search').val('foob').trigger('input');
        expect(element.find('.list div:visible').length).toBe(1);
        expect(element.find('.list div:nth-child(1)').is(':visible')).toBe(false);
        expect(element.find('.list div:nth-child(2)').is(':visible')).toBe(false);
        expect(element.find('.list div:nth-child(3)').is(':visible')).toBe(true);

        element.find('.search').val('foobars').trigger('input');
        expect(element.find('.list div:visible').length).toBe(0);
        expect(element.find('.list div:nth-child(1)').is(':visible')).toBe(false);
        expect(element.find('.list div:nth-child(2)').is(':visible')).toBe(false);
        expect(element.find('.list div:nth-child(3)').is(':visible')).toBe(false);

        element.find('.search').val('').trigger('input');
        expect(element.find('.list div:visible').length).toBe(3);
        expect(element.find('.list div:nth-child(1)').is(':visible')).toBe(true);
        expect(element.find('.list div:nth-child(2)').is(':visible')).toBe(true);
        expect(element.find('.list div:nth-child(3)').is(':visible')).toBe(true);
      });

      it('alternates row css classes as it searches', function () {
        element.find('.search').val('foo').trigger('input');
        expect(element.find('.list div:nth-child(1)').hasClass('odd')).toBe(true);
        expect(element.find('.list div:nth-child(2)').hasClass('odd')).toBe(false);
        expect(element.find('.list div:nth-child(3)').hasClass('odd')).toBe(false);

        element.find('.search').val('foob').trigger('input');
        expect(element.find('.list div:nth-child(1)').hasClass('odd')).toBe(false);
        expect(element.find('.list div:nth-child(2)').hasClass('odd')).toBe(false);
        expect(element.find('.list div:nth-child(3)').hasClass('odd')).toBe(true);

        element.find('.search').val('foobars').trigger('input');
        expect(element.find('.list div:nth-child(1)').hasClass('odd')).toBe(false);
        expect(element.find('.list div:nth-child(2)').hasClass('odd')).toBe(false);
        expect(element.find('.list div:nth-child(3)').hasClass('odd')).toBe(false);

        element.find('.search').val('').trigger('input');
        expect(element.find('.list div:nth-child(1)').hasClass('odd')).toBe(true);
        expect(element.find('.list div:nth-child(2)').hasClass('odd')).toBe(false);
        expect(element.find('.list div:nth-child(3)').hasClass('odd')).toBe(true);
      });
    });
  });
})();
