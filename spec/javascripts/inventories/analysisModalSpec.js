(function() {
  'use strict';

  describe('Directive: analysisModal', function() {

    var $scope,
        $compile,
        $httpBackend,
        element,
        isolatedScope;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
        $scope = _$rootScope_.$new(true);
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
      });

      element = angular.element('<analysis-modal></analysis-modal>');
      document.body.appendChild(element[0]);

      $compile(element)($scope);
    });

    afterEach(function () {
      document.body.removeChild(element[0]);
    });

    describe('renders correct version', function () {
      it('renders no inventories notice', function() {
        $httpBackend.expectGET('/v1/inventories')
                    .respond([]);
        $scope.$digest();
        isolatedScope = element.isolateScope();
        $httpBackend.flush();

        expect(element.find('.notice').is(':visible')).toBe(true);
      });

      it('renders form', function() {
        $httpBackend.expectGET('/v1/inventories')
                    .respond([{id: 1}]);
        $scope.$digest();
        isolatedScope = element.isolateScope();
        $httpBackend.flush();

        expect(element.find('.notice').is(':visible')).toBe(false);
      });
    });
  });
})();
