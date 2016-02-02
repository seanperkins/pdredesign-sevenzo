describe('Directive: organizationSelect', function() {
  var element,
      isolatedScope,
      $scope,
      $compile,
      $httpBackend,
      User;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope       = $rootScope.$new({});
    $compile     = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    User         = $injector.get('User');



    $httpBackend.whenGET('/v1/organizations/42').respond({id: 1, name: 'some org'});

    $scope.messages = {};
    element = angular.element("<organization-select organization-id='42' " +
                              "messages='messages'></organization-select>");

    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

  it('sets the organizationId correctly', function() {
    expect(isolatedScope.organizationId).toEqual(42);
  });

  it('updates the organization id', function(){
    isolatedScope.updateOrganizationId(41); 
    expect(isolatedScope.organizationId).toEqual(41);
  });

  describe('#performAction', function() {
    it('calls createOrganization when new org', function() {
      spyOn(isolatedScope, 'createOrganization');
      isolatedScope.performAction({ name: 'test' });
      expect(isolatedScope.createOrganization).toHaveBeenCalledWith({name: 'test'});
    });

    it('calls updateOrganizationId when existing org', function(){
      spyOn(isolatedScope, 'updateOrganizationId');
      isolatedScope.performAction({ id: 42, name: 'test' });
      expect(isolatedScope.updateOrganizationId).toHaveBeenCalledWith(42);
    });

    it('clears the org when a null object is padded', function(){
      spyOn(isolatedScope, 'clearOrganization');
      isolatedScope.performAction({});
      expect(isolatedScope.clearOrganization).toHaveBeenCalled();
    });
  });
});
