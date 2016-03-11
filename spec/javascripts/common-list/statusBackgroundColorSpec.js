(function() {
  'use strict';

  describe('Directive: statusBackgroundColor', function() {
    var element,
        $scope,
        $compile;

    function createElement(status){
      $scope.entity.status =  status;
      $compile(element)($scope);
      $scope.$digest();
      return element;
    }

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new(true);
        $compile = _$compile_;
        $scope.entity = {};
        element = angular.element('<div class="status-background-color"></div>');
      });
    });

    it('sets draft to background-color: rgb(151, 160, 165);', function() {
      element = createElement('draft');
      expect(element.css('background-color')).toEqual('rgb(151, 160, 165)');
    });

    it('sets assessment to background-color: rgb(91, 193, 180);', function() {
      element = createElement('assessment');
      expect(element.css('background-color')).toEqual('rgb(91, 193, 180)');
    });

    it('sets consensus to background-color: rgb(13, 72, 101));', function() {
      element = createElement('consensus');
      expect(element.css('background-color')).toEqual('rgb(13, 72, 101)');
    });
  });
})();
