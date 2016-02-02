describe('Controller: InvitationCtrl', function() {
  var subject,
      $httpBackend,
      $q,
      $location,
      $timeout,
      Invitation,
      SessionService;

  var mockInvitedUser = {first_name: 'Mike', last_name: 'Davis',
                         password: 'testtest', email: 'user@test.com'};

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($injector, $controller) {
    $q             = $injector.get('$q');
    $scope         = $injector.get('$rootScope').$new();
    $httpBackend   = $injector.get('$httpBackend');
    $timeout       = $injector.get('$timeout');
    $location      = $injector.get('$location');
    Invitation     = $injector.get('Invitation');
    SessionService = $injector.get('SessionService');

    $scope.token = 1;
    subject  = $controller('InvitationCtrl', { $scope: $scope });
    
  }));

  it('retrieves the invitedUser', function() {
    $httpBackend.expectGET('/v1/invitations').respond({});
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('redeemInvite calls Invitation.save resource', function() {
    spyOn(Invitation, 'save')
      .and.callFake(function() {
        return createSuccessDefer($q, {});
      });

    expect(Invitation.save).not.toHaveBeenCalled();
    $scope.redeemInvite();
    expect(Invitation.save).toHaveBeenCalled();
  });

  it('redeemInvite passes invitedUser information to the inviteObject', function() {
    $scope.invitedUser = mockInvitedUser;
    spyOn(Invitation, 'save')
      .and.callFake(function() {
        return createSuccessDefer($q, {});
      });

    expect($scope.inviteObject).toEqual({});
    expect($scope.inviteObject.first_name).not.toEqual('Mike');

    $scope.redeemInvite();
    expect($scope.inviteObject.first_name).toEqual('Mike');
  });

  it('Invitation save success callback should set url to assessment response', function() {
    $httpBackend
      .expectGET('/v1/invitations')
      .respond({});

    spyOn(Invitation, 'save')
    .and.callFake(function() {
      return createSuccessDefer($q, {});
    });

    spyOn(SessionService, 'syncAndRedirect');
    spyOn(SessionService, 'authenticate')
    .and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve({});
      return deferred.promise;
    });

    $scope.invitedUser.assessment_id = 42;
    $scope.redeemInvite();

    $httpBackend.flush();
    expect(SessionService.syncAndRedirect)
      .toHaveBeenCalledWith('/assessments/42/responses');
  });

  it('Invitation save failure callback should set up modal', function() {
   $httpBackend.expectGET('/v1/invitations').respond({});

   spyOn(Invitation, 'save')
    .and.callFake(function() {
      return createRejectDefer($q, 
        {data: {errors: {'password' : ['Invalid email or password!']}}});
    });
    expect($scope.alerts).toEqual([])
    $scope.redeemInvite();

    $httpBackend.flush();
    expect($location.url()).not.toEqual('/assessments');
    expect($scope.alerts).toEqual([{type: 'danger', msg: 'password: Invalid email or password!'}]);
  });

});
