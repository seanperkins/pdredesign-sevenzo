describe('Controller: ResetPasswordCtrl', function() {
  var subject,
      $scope,
      $q,
      SessionService,
      $location,
      $httpBackend;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller) {
      $httpBackend = $injector.get('$httpBackend');
      $rootScope   = $injector.get('$rootScope');
      $q           = $injector.get('$q');
      $location    = $injector.get('$location');
      SessionService = $injector.get('SessionService');
      $scope       = $rootScope.$new();

      subject  = $controller('ResetPasswordCtrl', {
        $scope: $scope,
      });
      $scope.assessmentId = 1;

  }));


  describe('#syncUser', function() {
    it('redirects to /', function() {
      spyOn($location, 'path');
      spyOn(SessionService, 'syncUser').and.callFake(function() {
        return createSuccessDefer($q, {id: 42}).$promise;
      });
      $scope.$apply();
      $scope.syncUser();
      expect($location.path).toHaveBeenCalledWith('/');
    });

  });

  describe('#requestPassword', function(){

    it('sends the reset request', function() {
      $httpBackend.expectPOST('/v1/user/request_reset').respond({});
      $scope.requestReset('someUser@email.com');
      $httpBackend.flush();
    });

  });

  describe('#resetPassword', function(){
    beforeEach(function() {
      spyOn($scope, 'syncUser');
    });

    it('sends the reset request', function() {
      $httpBackend.expectPOST('/v1/user/reset').respond({});
      spyOn($rootScope, '$broadcast').and.returnValue(true)
      $scope.resetPassword('test', 'test');
      $httpBackend.flush();
    });

    it('does not send when password dont match', function(){
      spyOn($scope, 'success');
      $scope.resetPassword('ztest', 'test');

      expect($scope.success).not.toHaveBeenCalled();
    });

  });
});

