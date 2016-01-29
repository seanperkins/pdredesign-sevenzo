describe('Directive: districtMessage', function() {
  var element,
      isolatedScope,
      DistrictMessage,
      $scope,
      $compile,
      $httpBackend;

  var message = {"name": "some name",
    "address": "123 Main st",
    "sender_name": "educator",
    "sender_email": "something@something.com"};

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');

    element = angular.element("<district-message></district-message>");
    $compile(element)($scope);
    $scope.$digest();
    $httpBackend        = $injector.get('$httpBackend');
    isolatedScope = element.isolateScope();
  }));

    describe('#sendMessage', function(){
      it('sets scope success to Thank you! on success', function(){
        $httpBackend.expectPOST('/v1/district_messages', message).respond({});
        isolatedScope.sendMessage(message);
        isolatedScope.$digest();
        $httpBackend.flush();
        expect(isolatedScope.success).toEqual("Thank you!");
      });

      it('correctly sets success with 401 POST', function(){
        $httpBackend.expectPOST('/v1/district_messages', message).respond(401, '');
        isolatedScope.sendMessage(message);
        isolatedScope.$digest();
        $httpBackend.flush();
        expect(isolatedScope.success).toEqual(null);

      });

    });

});
