describe('Controller: HomeCtrlSpec', function() {
  var subject,
      $scope,
      $state,
      $rootScope;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($controller, $injector) {
    $rootScope = $injector.get('$rootScope');
    $state     = $injector.get('$state');
    $scope     = $rootScope.$new();
    subject    = $controller('HomeCtrl', {
      $scope: $scope,
    });
  }));

  it('redirects to /home when logged in', function() {
    window.$state = $state;
    $state.go('root');

    spyOn($state, 'go');
    $scope.user = {id: 1};
    $scope.$digest();
    expect($state.go).toHaveBeenCalledWith('home');
  });



});
