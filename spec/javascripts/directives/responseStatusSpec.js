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
    expect(isolatedScope.showMailLink()).toEqual(true);
    $scope.user['status'] = 'Completed';
    expect(isolatedScope.showMailLink()).toEqual(false);
  });

  it('should show the invite email link', function(){
    expect($(element).find('.invite-email').hasClass('ng-hide')).toEqual(false);
    expect($(element).find('.user-status').hasClass('ng-hide')).toEqual(true);
  });

  it('hides the user status label', function(){
    $scope.user.status = 'other';

    isolatedScope.$digest();
    expect($(element).find('.invite-email').hasClass('ng-hide')).toEqual(true);
    expect($(element).find('.user-status').hasClass('ng-hide')).toEqual(false);
  });

  it('computes the correct URL', function(){ 
    expect(isolatedScope.endpoint()).toEqual('/v1/assessments/1/participants/1/mail');
  });

  it('gets an emails body from the api endpoint', function(){
    $httpBackend.expectGET('/v1/assessments/1/participants/1/mail').respond('expected body');
    var request = isolatedScope.getEmailBody();
    request.then(function(response){
      expect(response.data).toEqual('expected body');
    });

    $httpBackend.flush();

  });

  it('redirects to a mailto link', function(){
    $httpBackend.expectGET('/v1/assessments/1/participants/1/mail').respond('expected body');
    spyOn(isolatedScope, 'triggerMailTo');
    isolatedScope.sendEmail();
    $httpBackend.flush();

    var expectedLink = "mailto:user@example.com?subject=Invitation&body=expected%20body";
    expect(isolatedScope.triggerMailTo).toHaveBeenCalledWith(expectedLink);
  });

  it('returns the correct icon', function(){
    expect(isolatedScope.statusMessageIcon('invited')).toEqual('fa-envelope-o');
    expect(isolatedScope.statusMessageIcon('completed')).toEqual('fa-check');
    expect(isolatedScope.statusMessageIcon('in_progress')).toEqual('fa-spinner');
    expect(isolatedScope.statusMessageIcon('other')).toEqual('fa-envelope-o');
  });

  

});
