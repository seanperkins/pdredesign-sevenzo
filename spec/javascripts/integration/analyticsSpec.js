describe('Factory: Analytics', function() {
  var subject,
      Analytics,
      $scope,
      $state,
      $rootScope;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($controller, $injector) {
    $rootScope = $injector.get('$rootScope');
    $state     = $injector.get('$state');
    Analytics = $injector.get('Analytics');
    $scope     = $rootScope.$new();
    subject    = $controller('HomeCtrl', {
      $scope: $scope,
    });
    spyOn(Analytics, 'pageview');
    spyOn(Analytics, 'setPage');

    $state.go('root');
    $scope.$digest();
  }));

  it('calls setPage when $state changes', function() {
    expect(Analytics.setPage).toHaveBeenCalled();
  });

  it('calls pageview when $state changes', function() {
    expect(Analytics.pageview).toHaveBeenCalled();
  });

});