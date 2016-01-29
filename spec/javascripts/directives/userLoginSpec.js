describe('Directive: userLogin', function() {
  var scope;
  var element;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $compile) {
    scope   = $rootScope.$new();
    element = angular.element('<user-login></user-login>');
    $compile(element)(scope);
    scope.$digest();


  }));

  describe('#authenticate', function() {


    beforeEach(inject(function(SessionService, $q) {
      session = SessionService;

      spyOn(SessionService, 'authenticate')
        .and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve({});
          return deferred.promise;
        });

        element
          .find("#email")
          .val('test@user.com')
          .trigger('input');

        element
          .find("#password")
          .val('somepass')
          .trigger('input');
    }));
    function submitForm() {
       element
          .find("input#authenticate")
          .click();
    };

    it('calls authenticate on SessionService',
      inject(function(SessionService, $q) {
        submitForm();

        expect(session.authenticate)
          .toHaveBeenCalledWith('test@user.com', 'somepass');
    }));

    it('shows errors on invalid login', inject(
      function(SessionService, $q){
        // Reset Service
        SessionService.authenticate = null;

        spyOn(SessionService, 'authenticate')
          .and.callFake(function() {
            var deferred = $q.defer();
            deferred.reject(false);
            return deferred.promise;
          });

        submitForm();
        expect(element.html())
          .toMatch(/Invalid email or password/);

    }));

    it('redirects to the homepage', inject(
      function(SessionService, $location, $q) {
        spyOn($location, 'path');
        submitForm();

        expect($location.path).toHaveBeenCalledWith('/home');
    }));

    it('emits session_updated',
      function(done) {
        scope.$on('session_updated', function(){
          done();
        });
        submitForm();
    });

  });
});
