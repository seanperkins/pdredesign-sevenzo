describe('Directive: httpPrefix', function() {
  var element,
      isolatedScope,
      $scope,
      $compile;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');

    element = angular.element("<form> <input type='url' ng-model='test' http-prefix></form>");
    $compile(element)($scope);
    $scope.$digest();
    isolatedScope = element.isolateScope();
  }));

    it('sets prefix http:// to input value', function(){
        element
          .find('input')
          .val('www.hello.com')
          .trigger('input');

      expect(element.find('input').val()).toEqual("http://www.hello.com");
    });

    it('allows prefix https:// to be used', function(){
        element
          .find('input')
          .val('https://hello.com')
          .trigger('input');

      expect(element.find('input').val()).toEqual("https://hello.com");
    });

});
