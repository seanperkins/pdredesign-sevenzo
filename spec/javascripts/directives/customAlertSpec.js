describe('Directive: customalert', function() {
  var scope;
  var element;
  var compile;

  beforeEach(module('PDRClient'));

  it('it is a success alert ', inject(
    function($rootScope, $compile) {
      scope   = $rootScope.$new();
      element = angular.element('<customalert data-message="HeLLO JELOO" data-type="success"></customalert>');
      $compile(element)(scope);
      scope.$digest();
      var div = element.find('div');
      var attrClass = div.attr('class')
      expect(attrClass).toEqual('customalert success')
  }));

  it('it is a success alert ', inject(
    function($rootScope, $compile) {
      scope   = $rootScope.$new();
      element = angular.element('<customalert data-message="HeLLO JELOO" data-type="error"></customalert>');
      $compile(element)(scope);
      scope.$digest();
      var div = element.find('div');
      var attrClass = div.attr('class')
      expect(attrClass).toEqual('customalert error')
  }));


});
