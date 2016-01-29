describe('Directive: districtFilter', function() {
  var element,
      isolatedScope,
      $scope,
      $compile,
      $timeout,
      $q,
      $httpBackend;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $q       = $injector.get('$q');
    $timeout = $injector.get('$timeout');
    $scope.districts = [1, 2, 3];
    $scope.selectedDistrict = "";

    element = angular.element("<district-filter districts='districts'"
                                   + "selected-district='selectedDistrict'>"
                                   + "</district-filter>");
    $compile(element)($scope);
    $scope.$digest();
    isolatedScope = element.isolateScope();
  }));

    it('sets districts correctly', function(){
      expect(isolatedScope.districts).toEqual([1, 2, 3]);
    });

    it('sets the selectedDistrict correctly', function(){
      expect(isolatedScope.selectedDistrict).toEqual('')
    });

});
