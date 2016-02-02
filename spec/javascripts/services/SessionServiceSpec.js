describe('Service: SessionService', function() {
  var $q,
      $scope,
      $httpBackend,
      $state,
      $location,
      SessionService,
      UrlService,
      User;

  beforeEach(module('PDRClient'));
  beforeEach(function() { localStorage.clear(); });
  beforeEach(inject(function($injector, $rootScope) {
    UrlServicve    = $injector.get('UrlService');
    SessionService = $injector.get('SessionService');
    User           = $injector.get('User');
    $q             = $injector.get('$q');
    $httpBackend   = $injector.get('$httpBackend');
    $location      = $injector.get('$location');
    $scope         = $rootScope.$new();
    $state         = $injector.get('$state');
  }));

  it('clears the services state $on clear_user', function() {
    spyOn(SessionService, 'clear');
    $scope.$emit('clear_user');

    expect(SessionService.clear).toHaveBeenCalled();
  });

  it('redirects to login $on clear_user', function() {
    spyOn($state, 'go');
    $scope.$emit('clear_user');

    expect($state.go).toHaveBeenCalledWith('login');
  });

  describe('#isNetworkPartner', function() {
    function fakeRole(role) {
      spyOn(SessionService, 'userRole').and.returnValue(role);
    }

    it('returns true when the user is a networkpartner', function() {
      fakeRole('network_partner');
      expect(SessionService.isNetworkPartner()).toEqual(true);
    });

    it('returns false when the user is a district member', function() {
      fakeRole('district_member');
      expect(SessionService.isNetworkPartner()).toEqual(false);
    });
  });

  describe('#syncAndRedirect', function(){
    it('Syncs the current logged in user from the server and redirects', function(){
      spyOn(User, 'get').and.callFake(function() {
        return createSuccessDefer($q, {id: 42});
      });

      spyOn($location, 'path');

      SessionService.syncAndRedirect('/assessments');
      $scope.$apply();

      expect($location.path).toHaveBeenCalledWith('/assessments');

    });
  });

  describe('#syncUser', function() {
    it('syncs the user from the server', function() {
      spyOn(User, 'get').and.callFake(function() {
        return createSuccessDefer($q, {id: 42});
      });
      
      SessionService.syncUser();
      $scope.$apply();

      expect(SessionService.getUserAuthenticated()).toEqual(true);
      expect(SessionService.getCurrentUser().id).toEqual(42);
    });

    it('returns a success promise', function(){
      spyOn(User, 'get').and.callFake(function() {
        return createSuccessDefer($q, {id: 42});
      });

      SessionService.syncUser().then(function(data) {
        expect(data.id).toEqual(42);
      });
      $scope.$apply();
    });

    it('returns a failed promise', function(){
      spyOn(User, 'get').and.callFake(function() {
        return createRejectDefer($q, {});
      });

      SessionService.syncUser().then(null, function(response){
        expect(response).toEqual(false);
      });
      $scope.$apply();
    });

  });

  describe('#softLogin', function() {
    afterEach(function(){ localStorage.clear(); });

    it('doesnt log user in when there is no loclStorage user', function() {
      SessionService.softLogin(); 
      expect(SessionService.getUserAuthenticated()).toEqual(false); 
    });

    it('logs in a localStorage user', function() {
      localStorage.setItem('user', JSON.stringify({id: 50, role: 'network_partner'}));

      SessionService.softLogin(); 
      expect(SessionService.getUserAuthenticated()).toEqual(true); 
      expect(SessionService.getCurrentUser()).toEqual({id: 50, role: 'network_partner'}); 
    });

    it('forces a sync', function() {
      spyOn(SessionService, 'syncUser').and.returnValue(true);
      localStorage.setItem('user', JSON.stringify({id: 50, role: 'network_partner'}));

      SessionService.softLogin(); 
      expect(SessionService.syncUser).toHaveBeenCalled();
    });
  });

  describe('#logout', function() {
    it('logs out a user', function() {
      localStorage.setItem('user', JSON.stringify({id: 50, role: 'network_partner'}));
      SessionService.logout();
      
      expect(SessionService.getCurrentUser()).toEqual(null);
      expect(SessionService.getUserAuthenticated()).toEqual(false);
    });

    it('logs out a user on the server', function() {
      $httpBackend.when('DELETE', '/v1/users/sign_out').respond(true);

      SessionService.logout();
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

});
