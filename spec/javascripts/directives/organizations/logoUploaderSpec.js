xdescribe('Directive: logoUploader', function() {
  var element,
      isolatedScope,
      $scope,
      $compile,
      $httpBackend;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope       = $rootScope.$new({});
    $compile     = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.expectGET('/v1/organizations/42').respond({logo: 'test.jpg'});
    $scope.organizationId = 42;
    element = angular.element('<logo-uploader data-organization-id="organizationId"></logo-uploader>');

    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();

  }));

  it('#onBeforeUploadItem sets uploading to true', function(){
    isolatedScope.uploader.onBeforeUploadItem();
    expect(isolatedScope.uploading).toEqual(true);
  });

  it('#onCompleteAll sets uploading to false', function(){
    isolatedScope.uploader.onCompleteAll();
    expect(isolatedScope.uploading).toEqual(false);
  });

  it('sets the organizationId correctly', function() {
    expect(isolatedScope.organizationId).toEqual(42);
  });

  it('can update a organizations logo', function() {
    $httpBackend.expectGET('/v1/organizations/42').respond({logo: 'other.jpg'});

    isolatedScope.updateLogo(42);

    $httpBackend.flush();
    expect(isolatedScope.logo).toEqual('other.jpg');
  });

});
