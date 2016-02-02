describe('Resource: Assessment', function() {
  var subject, scope, $httpBackend;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($resource, $rootScope, AssessmentPermission, $injector) {
    scope = $rootScope.$new();
    subject = AssessmentPermission;
    $httpBackend = $injector.get('$httpBackend');
  }));

  it("resource shuold return all the users related to an assessment", function(){
    $httpBackend.expectGET('/v1/assessments/1/permissions/all_users').respond([1, 2]);
    var users = subject.users({
      assessment_id: 1
    });
    $httpBackend.flush();
    expect(users.length).toEqual(2);
  });

  it("resource should return requested permissions list", function() {
    $httpBackend.expectGET('/v1/assessments/1/permissions').respond([1, 2]);
    var requested = subject.query({
      assessment_id: 1
    });
    $httpBackend.flush();
    expect(requested.length).toEqual(2);
  });

  it("it should give the request to deny permissions PUT#deny", function(){
    $httpBackend.expectPUT('/v1/assessments/1/permissions/1/deny').respond({});
    subject.deny({
      assessment_id: 1, 
      id: 1
    }, {email: 'some@email.com'});
    $httpBackend.flush();
  });

  it("it should give the request to deny permissions PUT#deny", function(){
    $httpBackend.expectPUT('/v1/assessments/1/permissions/1/accept').respond({});
    subject.accept({
      assessment_id: 1,
      id: 1
    },{
      email: 'some@email.com'
    });
    $httpBackend.flush();
  });

  it("it should return the access request for a single user in an assessment", function(){
    $httpBackend.expectGET('/v1/assessments/1/permissions/1?email=some@some.com').respond({});
    subject.get({
      assessment_id: 1, 
      id: 1,
      email: 'some@some.com'
    }, {});
    $httpBackend.flush();
  });

  it("GET#current_level", function(){
    $httpBackend.expectGET('/v1/assessments/1/permissions/1/current_level').respond({});
    subject.level({
      assessment_id: 1,
      id: 1
    }, {});
    $httpBackend.flush();
  });
});