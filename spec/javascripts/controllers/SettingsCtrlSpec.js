describe('Controller: SettingsCtrl', function() {
  var $scope,
      $q,
      $location,
      $httpBackend,
      $anchorScroll,
      SessionService,
      User,
      subject;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller, $rootScope) {
    $scope         = $rootScope.$new();
    $q             = $injector.get('$q');
    $httpBackend   = $injector.get('$httpBackend');
    $location      = $injector.get('$location');
    User           = $injector.get('User');
    SessionService = $injector.get('SessionService');
    $anchorScroll = jasmine.createSpy('anchorScroll');

    subject  = $controller('SettingsCtrl', {
      $scope: $scope,
      $anchorScroll: $anchorScroll
    });
    $httpBackend.when('GET', '/v1/user').respond({id: 1});
    $httpBackend.flush();

  }));

  describe("#scrollTop", function() {
    it('sets location.hash to form-top', function(){
      $scope.scrollTop();
      expect($location.hash()).toEqual('form-top')
    });
  });


  describe('#getUserInfo', function() {
    it('sets user after Get user call success', function(){
      expect($scope.user.id).toEqual(1);

    });
  });

  describe('#updateUser', function() {
    it('User saves gives success call', function() {
      spyOn(User, 'save')
        .and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve(true);
          return {$promise: deferred.promise};
        });

      $scope.updateUser($scope.user);
      $scope.$apply();
      expect($scope.success).toEqual("Your profile has been updated");

    });

    it('save User failure creates scope.errors', function(){
      spyOn(User, 'save')
        .and.callFake(function() {
          var deferred = $q.defer();
          deferred.reject({
          "data": {
            "errors": "error"
            }
          });
          return {$promise: deferred.promise};
        });
      $scope.updateUser($scope.user);
      $scope.$apply();
      expect($scope.errors).toEqual("error");
    });
  });

});
