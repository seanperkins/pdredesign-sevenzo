describe('Directive: signup', function() {
  var element,
      isolatedScope,
      SessionService,
      $scope,
      $compile,
      $location,
      $httpBackend;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $httpBackend = $injector.get('$httpBackend');
    SessionService = $injector.get('SessionService');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');

    $scope.isNetworkPartner = true;
    element = angular.element("<signup is-network-partner={{isNetworkPartner}}></signup>");

    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

  it('sets isNetworkPartner correctly', function() {
    expect(isolatedScope.isNetworkPartner).toEqual('true');
  });

  it('it hides district-select and shows organizaton-select when isNetworkPartner is true', function() {
    expect(element.find('district-select').hasClass('ng-hide'))
      .toBe(true);
    expect(element.find('organization-select').hasClass('ng-hide'))
      .toBe(false);
  });

  it('it hides organizaton-select and shows district-select when isNetworkPartner is false', function() {
    isolatedScope.isNetworkPartner = false;
    isolatedScope.$digest();
    expect(element.find('district-select').hasClass('ng-hide'))
      .toBe(false);
    expect(element.find('organization-select').hasClass('ng-hide'))
      .toBe(true);
  });

  describe('#setRole', function() {
    it('sets user role to network_partner when isNetworkPartner is true', function(){
      expect(isolatedScope.user.role).not.toEqual('network_partner');
      isolatedScope.setRole(isolatedScope.user);
      expect(isolatedScope.user.role).toEqual('network_partner');
    });

    it('does not set user role to  network_partner when isNetworkPartner is false', function(){
      isolatedScope.isNetworkPartner = false;
      isolatedScope.setRole(isolatedScope.user);
      expect(isolatedScope.user.role).not.toEqual('network_partner');
    });
  });

  describe('#createUser', function() {
    it('calls setRole()', function(){
      spyOn(isolatedScope, 'setRole');
      isolatedScope.createUser(isolatedScope.user);
      expect(isolatedScope.setRole).toHaveBeenCalled();
    });

    it('sends User object to POST and responds with correct value', function(){
      var user = {"first_name": "some name",
        "email": "email@email.com",
        "last_name": "last name",
        "password": "testhello"};

      isolatedScope.user = user;
      $httpBackend.expectPOST('/v1/user', isolatedScope.user).respond({});
      isolatedScope.createUser(isolatedScope.user);
      isolatedScope.$digest();
    });

    describe('successfull User POST', function() {
      beforeEach(inject(function($injector) {
        spyOn(isolatedScope, 'login');

        $httpBackend.expectPOST('/v1/user')
          .respond({});
        element
          .find('input')
            .val('hello@hellome.com')
            .trigger('input');
        element.find('button').trigger('click');
        isolatedScope.$digest();
        $httpBackend.flush();
      }));

      it('calls scope login function', function() {
        expect(isolatedScope.login).toHaveBeenCalled();
      });

      it('sets scope success to User created', function() {
        expect(isolatedScope.success).toEqual("User created");
      });

    });

    describe('User POST error', function() {
      beforeEach(inject(function($injector) {
        spyOn(isolatedScope, 'login');

        $httpBackend.expectPOST('/v1/user')
          .respond(401, {});
        element
          .find('input')
            .val('hello@hellome.com')
            .trigger('input');
        element.find('button').trigger('click');
        isolatedScope.$digest();
        $httpBackend.flush();
      }));

      it('does not call login function', function() {
        expect(isolatedScope.login).not.toHaveBeenCalled();
      });

      it('scope success is null', function() {
        expect(isolatedScope.success).toEqual(null);
      });

    });
  });

});
