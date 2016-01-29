describe('Directive: disableAssessment', function() {
  var element,
      $scope,
      $compile;

  function CreateElement(requestAccess){
    $scope.assessment.has_access = requestAccess;
    $compile(element)($scope);
    $scope.$digest();
    return element;
  }

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $scope.assessment = {};
    element = angular.element("<div class='disable-assessment'>");
  }));

  it('sets opacity to 0.5 has_access is false', function() {
    element = CreateElement(false);
    expect(element.css('opacity')).toEqual('0.5');
  });

  it('keeps opacity 1 if has_access is true', function() {
    element = CreateElement(true);
    expect(element.css('opacity')).toEqual('1');
  });

});
