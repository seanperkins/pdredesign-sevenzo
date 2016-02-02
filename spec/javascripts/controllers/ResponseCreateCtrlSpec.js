describe('Controller: ResponseCreateCtrl', function() {
  var subject,
      scopeget,
      httpBackend,
      timeout,
      AssessmentResource,
      ResponseResource;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller) {
      q  = $injector.get('$q');
      scope              = $injector.get('$rootScope').$new();
      httpBackend        = $injector.get('$httpBackend');
      AssessmentResource = $injector.get('Assessment');
      ResponseResource   = $injector.get('Response');
      timeout            = $injector.get('$timeout');

      subject  = $controller('ResponseCreateCtrl', {
        $scope: scope
      });
      scope.assessmentId = 1;

  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('retrieves the Assessment', function() {
    httpBackend.expectGET('/v1/assessments/1').respond({});
    scope.getAssessment();
    httpBackend.flush();
  });

  it('creates a new response', function() {
    httpBackend.expectPOST('/v1/assessments/2/responses').respond({})
    scope.createResponse(2, 3);
    httpBackend.flush();
  });

  it('calls getAssessment', function() {
    spyOn(scope, 'getAssessment')
      .and.callFake(function() {
          var deferred = q.defer();
          deferred.reject(false);
          return {$promise: deferred.promise};
    });

    timeout.flush();
    expect(scope.getAssessment).toHaveBeenCalled();
  });

  it('calls createResponse', function() {
    spyOn(scope, 'createResponse')
      .and.callFake(function() {
          var deferred = q.defer();
          deferred.reject(false);
          return {$promise: deferred.promise};
    });

    scope.createResponse()
    scope.$apply()
    expect(scope.createResponse).toHaveBeenCalled();

  });

});
