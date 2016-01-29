describe('Controller: NavigationCtrl', function() {
  var subject,
      scope,
      rootScope;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($controller, $injector) {
    rootScope = $injector.get('$rootScope');
    scope     = rootScope;
    subject   = $controller('NavigationCtrl', {
      $scope: scope,
    });

  }));

  it('give the active class for current state', function() {
    scope.currentLocation = 'home';
    expect(scope.activeClassFor('home')).toEqual('active');
    expect(scope.activeClassFor('current_state')).toEqual('');

    scope.currentLocation = 'current_state';
    expect(scope.activeClassFor('home')).toEqual('');
    expect(scope.activeClassFor('current_state')).toEqual('active');
  });

  it('update template when $emit session_updated', inject(
    function(SessionService) {
      spyOn(SessionService, 'setUserTemplate');

      scope.user = {};
      rootScope.$emit('session_updated');

      expect(SessionService.setUserTemplate)
        .toHaveBeenCalled();
  }));

});
