describe('Directive: avatar', function() {
  var scope;
  var element;
  var compile;

  beforeEach(module('PDRClient'));

  it('has the correct CSS class', inject(
    function($rootScope, $compile) {
      scope   = $rootScope.$new();
      element = angular.element('<avatar data-imgclass="circle"></avatar>');
      $compile(element)(scope);
      scope.$digest();
      var i = element.find('img');
      var attrClass = i.attr('class')
      expect(attrClass).toEqual('circle')
  }));

   it('has no CSS class by default', inject(
    function($rootScope, $compile) {
      scope   = $rootScope.$new();
      element = angular.element('<avatar></avatar>');
      $compile(element)(scope);
      scope.$digest();
      var i = element.find('img');
      var attrClass = i.attr('class')
      expect(attrClass).toEqual('')
  }));

  it('tooltip data-placement is "" by default', inject(
    function($rootScope, $compile) {
      scope   = $rootScope.$new();
      element = angular.element('<avatar></avatar>');
      $compile(element)(scope);
      scope.$digest();
      var i = element.find('img');
      var attrClass = i.attr('data-placement')
      expect(attrClass).toEqual('')

  }));

  it('tooltip data-placement can be adjusted', inject(
    function($rootScope, $compile) {
      scope   = $rootScope.$new();
      element = angular.element('<avatar toolplacement="bottom"></avatar>');
      $compile(element)(scope);
      scope.$digest();
      var i = element.find('img');
      var attrClass = i.attr('data-placement')
      expect(attrClass).toEqual('bottom')
  }));

  it('has the correct CSS class', inject(
    function($rootScope, $compile) {
      scope   = $rootScope.$new();
      element = angular.element('<avatar data-imgclass="circle"></avatar>');
      $compile(element)(scope);
      scope.$digest();
      var i = element.find('img');
      var attrClass = i.attr('class')
      expect(attrClass).toEqual('circle')
  }));

});
