describe('Directive: assessmentBackgroundColor', function() {
  var element,
      $scope,
      $compile;

  function createElement(status){
    $scope.assessment.status =  status;
    $compile(element)($scope);
    $scope.$digest();
    return element;
  };

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $scope.assessment = {};
    element = angular.element("<div class='assessment-background-color'></div>");
  }));

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
