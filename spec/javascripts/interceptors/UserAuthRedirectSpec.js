describe('Interceptor: UserAuthRedirector', function() {
  var $httpBackend, $location, $rootScope, User, SessionService;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector) {
    $httpBackend   = $injector.get('$httpBackend');
    $location      = $injector.get('$location');
    $rootScope     = $injector.get('$rootScope');
    SessionService = $injector.get('SessionService');
    User           = $injector.get('User');
  }));

  it("Redirects to login screen when User is logged out", function() {
    $httpBackend
      .expectGET('/v1/user')
      .respond(function (method, url, data, headers) {
        return [401, {
          error: "You need to sign in or sign up before continuing."
        }, {}, 'TestPhrase'];
      });

    localStorage.clear();
    localStorage.setItem('user', JSON.stringify({id: 50, role: 'network_partner'}));

    spyOn($rootScope, '$emit');
    SessionService.softLogin();

    $httpBackend.flush();
    expect($rootScope.$emit).toHaveBeenCalledWith('clear_user')

    localStorage.clear();
  });

});
