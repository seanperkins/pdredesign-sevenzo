describe('Directive: districtSelect', function() {
  var element,
      isolatedScope,
      $scope,
      $compile,
      $httpBackend,
      $timeout;

  function createElement(multiple) {
    var element = angular.element("<district-select"
                             + " data-multiple='" + (multiple || false) + "'"
                             + " data-preselected='selected'"
                             + " data-districts='districts'>"
                             + " </district-select>");

    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
    isolatedScope.$digest();
    $timeout.flush();

    return element;
  };

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope       = $rootScope.$new({});
    $compile     = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $timeout     = $injector.get('$timeout');

    $scope.selected  = [{id: 50, text: 'some text'}];
    $scope.districts = [];

    element = createElement(false);
  }));

  it('assigns the preselected correctly', function() {
    expect(isolatedScope.preselected).toEqual([{"id":50,"text":"some text"}]);
  });

  it('assings the passed in preselected districts to selectize', function() {
    expect(isolatedScope.prepopulated).toEqual(true);
    expect(isolatedScope.selectize.getOption(50).length).toEqual(1);
  });

  it('defaults to preselected districts', function(){
    expect($scope.districts).toEqual('50');
  });

  it('only allows one value when multiple is not set', function(){
    var options = [{id: 25, text: 'some district'},
    {id: 26, text: 'other district'}];

    isolatedScope.selectize.addOption(options);
    isolatedScope.$digest();

    isolatedScope.selectize.setValue([25, 26]);

    expect($scope.districts).toEqual('26');
  });

  it('sets multiple districts attribute correctly', function(){
    element = createElement(true);
    var options = [{id: 25, text: 'some district'},
                   {id: 26, text: 'other district'}];

    isolatedScope.selectize.addOption(options);
    isolatedScope.$digest();

    isolatedScope.selectize.setValue([25, 26]);

    expect($scope.districts).toEqual('25,26');
  });

  it('can set empty districts', function(){
    isolatedScope.selectize.setValue([]);
    expect($scope.districts).toEqual('');
  });

});
