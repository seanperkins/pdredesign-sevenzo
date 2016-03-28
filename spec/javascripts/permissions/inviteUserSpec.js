describe('Directive: InviteUser', function() {
  var $scope,
      $compile,
      $timeout,
      $modal,
      $httpBackend,
      element,
      UserInvitation,
      isolatedScope;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $rootScope) {
    $compile = $injector.get('$compile');
    $timeout = $injector.get('$timeout');
    $modal   = $injector.get('$modal');
    $scope   = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');

    UserInvitation = $injector.get('UserInvitation');
    element     = angular.element('<invite-user data-assessment-id=1></invite-user>');
    timeout     = $timeout;

    $compile(element)($scope);

    $scope.$digest();
    isolatedScope = element.isolateScope();

    spyOn(isolatedScope, 'closeModal');
  }));
  
  it('shows an invite modal', function() {
    spyOn($modal, 'open');
    isolatedScope.showInviteUserModal();
    expect($modal.open).toHaveBeenCalled();
  });

  describe('with mock request', function() {
    beforeEach(function(){
      $httpBackend
        .expectPOST('/v1/assessments/1/user_invitations', {first_name: 'test'})
        .respond({});
    });

    it('creates a UserInvitation', function() {
      isolatedScope.createInvitation({first_name: 'test'});
      $httpBackend.flush();
    });

    it('emits update_participants', function(){
      spyOn(isolatedScope, '$emit');
      isolatedScope.createInvitation({first_name: 'test'});
      $httpBackend.flush();
      expect(isolatedScope.$emit).toHaveBeenCalledWith('update_participants');
    });

    it('closes the invite modal', function() {
      isolatedScope.createInvitation({first_name: 'test'});
      $httpBackend.flush();

      expect(isolatedScope.closeModal).toHaveBeenCalled();
    });
  });
  
  it('sets :send_invite when attr is set', function() {
    element = angular.element('<invite-user data-assessment-id=1 send-invite="true"></invite-user>');
    $compile(element)($scope);
    $scope.$digest();
    scope = element.isolateScope();
    spyOn(scope, 'closeModal');

    $httpBackend
      .expectPOST('/v1/assessments/1/user_invitations', 
        {first_name: 'test', send_invite: true}
      ).respond({});

    scope.createInvitation({first_name: 'test'});
    $httpBackend.flush();
  });

});


