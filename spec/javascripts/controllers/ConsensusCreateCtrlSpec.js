describe('Controller: ConsensusCreateCtrl', function() {
  var subject,
      scopeget,
      httpBackend,
      timeout,
      ConsensusResource;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller) {
    q  = $injector.get('$q');
    scope              = $injector.get('$rootScope').$new();
    httpBackend        = $injector.get('$httpBackend');
    ConsensusResource  = $injector.get('Consensus');
    timeout            = $injector.get('$timeout');

    subject  = $controller('ConsensusCreateCtrl', {
      $scope: scope
    });
    scope.assessmentId = 2

  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('Consensus create is called', function() {
    spyOn(ConsensusResource, 'create')
    .and.callFake(function() {
      var deferred = q.defer();
      deferred.resolve({});
      return {$promise: deferred.promise};
    });
    timeout.flush();
    expect(ConsensusResource.create).toHaveBeenCalled();
  });

  it('Consensus create is called', function() {
    httpBackend.expectPOST('/v1/assessments/2/consensus').respond({})
    scope.createConsensus(2, 3);
    httpBackend.flush();
  });

  it('Consensus create fails and isError is true', function() {
    spyOn(ConsensusResource, 'create').and.callFake(function(){
      var deferred = q.defer();
      deferred.reject({});
      return {$promise: deferred.promise};
    });

    scope.createConsensus()
    scope.$apply();
    expect(scope.isError).toEqual(true);
  });

  it('Consensus create is successful and has no errors', function() {
    spyOn(ConsensusResource, 'create').and.callFake(function(){
      var deferred = q.defer();
      deferred.resolve({});
      return {$promise: deferred.promise};
    });

    scope.createConsensus()
    scope.$apply();
    expect(scope.isError).toEqual(null);
  });



});
