describe('Directive: ResponseStatus', function() {
  var $scope,
      $compile,
      $httpBackend,
      element,
      isolatedScope;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($injector, $rootScope) {
    $compile = $injector.get('$compile');
    $scope   = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    
    $scope.user = {
      assessment_id: 1, 
      participant_id: 1, 
      status: 'invited', 
      email: 'user@example.com'
    };

    element  = angular.element('<response-status data-user="user"></response-status>');

    $compile(element)($scope);

    $scope.$digest();
    isolatedScope = element.isolateScope();

  }));

  it('should only show mail link when status is invited', function(){
    expect(isolatedScope.vm.showMailLink()).toEqual(true);
    $scope.user['status'] = 'Completed';
    expect(isolatedScope.vm.showMailLink()).toEqual(false);
  });

  it('computes the correct URL', function(){ 
    expect(isolatedScope.vm.endpoint()).toEqual('/v1/assessments/1/participants/1/mail');
  });

  it('gets an emails body from the api endpoint', function(){
    $httpBackend.expectGET('/v1/assessments/1/participants/1/mail').respond('expected body');
    var request = isolatedScope.vm.getEmailBody();
    request.then(function(response){
      expect(response.data).toEqual('expected body');
    });

    $httpBackend.flush();
  });

  it('redirects to a mailto link', function(){
    $httpBackend.expectGET('/v1/assessments/1/participants/1/mail').respond('expected body');
    spyOn(isolatedScope.vm, 'triggerMailTo');
    isolatedScope.vm.sendEmail();
    $httpBackend.flush();

    var expectedLink = "mailto:user@example.com?subject=Invitation&body=expected%20body";
    expect(isolatedScope.vm.triggerMailTo).toHaveBeenCalledWith(expectedLink);
  });
});
