describe('Controller: ProspectiveUserCtrl', function() {
  var subject;
  var scope;
  var user;
  var q;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($q, ProspectiveUser, $controller, $rootScope) {
    q        = $q;
    scope    = $rootScope;
    user     = ProspectiveUser;
    subject  = $controller('ProspectiveUserCtrl', {
      $scope: scope,
      ProspectiveUser: user
    });

    subject.$scope = scope;
  }));

  describe('#submit', function() {
    it('can submit a prospective user', function() {
      spyOn(user, 'save').and.callFake(function(){
        var deferred = q.defer();
        deferred.resolve('test');
        return {$promise: deferred.promise};
      });

      scope.submit({email: 'some_user_email@gmail.com'});

      scope.$apply();
      expect(scope.success).not.toEqual(null);
    });

    it('handles failed request', function() {
      spyOn(user, 'save').and.callFake(function(){
        var deferred = q.defer();
        deferred.reject({
          data: {
            errors: {
              email: ["invalid email"],
            }
          }
        });
        return {$promise: deferred.promise};
      });

      scope.submit({email: 'some_user_email@gmail.com'});

      scope.$apply();
      expect(scope.errors).not.toEqual(null);
    });

  });
});
