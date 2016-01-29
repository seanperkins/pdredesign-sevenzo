describe('Directive: organizationSection', function() {
  var element,
      isolatedScope,
      $scope,
      $compile, 
      $httpBackend;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/v1/organizations/1').respond({id: 1, name: 'some org'});

    element = angular.element("<organization-section organization-id='1'> </organization-section>");
    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

  xit('sets the organizationId correctly', function(){
    expect(isolatedScope.organizationId).toEqual(1);
  });

});
