describe('Directive: statusFilter', function() {
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
    $scope.statuses = [1, 2, 3];
    $scope.selectedStatus = '';

    element = angular.element("<status-filter selected-status='selectedStatus' statuses='statuses'> </status-filter>");
    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

    it('sets statuses correctly', function(){
      expect(isolatedScope.statuses).toEqual([1, 2, 3]);
    });

    it('sets the selectedStatus correctly', function(){
      expect(isolatedScope.selectedStatus).toEqual('')
    });


});
