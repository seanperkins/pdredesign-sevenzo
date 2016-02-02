describe('Directive: permissionFilter', function() {
  var element,
      isolatedScope,
      $scope,
      $compile,
      $timeout,
      $q,
      $httpBackend;

      var permissionTypes =["Facilitator", "Participant"];

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $q       = $injector.get('$q');
    $timeout = $injector.get('$timeout');
    $scope.types = [1, 2]
    $scope.selectedPermission = "";

    element = angular.element("<permission-filter selected-permission='selectedPermission' types='types'></permission-filter>");
    $compile(element)($scope);
    $scope.$digest();
    isolatedScope = element.isolateScope();
  }));

    it('sets the types correctly', function(){
      expect(isolatedScope.types).toEqual([1, 2]);
    });

    it('sets the selectedPermission correctly', function(){
      expect(isolatedScope.selectedPermission).toEqual('');
    });


});
