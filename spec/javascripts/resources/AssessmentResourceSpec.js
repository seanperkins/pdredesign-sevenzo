describe('Resource: Assessment', function() {
  var subject, scope, $httpBackend;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($resource, $rootScope, Assessment, $injector) {
    scope = $rootScope.$new();
    subject = Assessment;
    $httpBackend = $injector.get('$httpBackend');
  }));

  it("resource should return users assessments for index", function() {
      $httpBackend.expectGET('/v1/assessments').respond([1, 2]);
      var results = subject.query();
      $httpBackend.flush();
      expect(results.length).toEqual(2);
  });

});
