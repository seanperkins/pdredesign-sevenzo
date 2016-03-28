(function() {
  'use strict';

  describe('Directive: InviteUser', function() {
    var $scope,
        $compile,
        $modal,
        $httpBackend;

    beforeEach(function() {
      module('PDRClient');
      inject(function($injector, $rootScope) {
        $compile = $injector.get('$compile');
        $modal = $injector.get('$modal');
        $scope = $rootScope.$new(true);
        $httpBackend = $injector.get('$httpBackend');
      });
    });

    it('sets :send_invite when attr is set', function() {
      var element = angular.element('<invite-user data-assessment-id=1 send-invite="true"></invite-user>');
      $compile(element)($scope);
      $scope.$digest();
      var isolatedScope = element.isolateScope();
      spyOn(isolatedScope, 'closeModal');

      $httpBackend
          .expectPOST('/v1/assessments/1/user_invitations',
              {first_name: 'test', send_invite: true}
          ).respond({});

      isolatedScope.createInvitation({first_name: 'test'});
      $httpBackend.flush();
    });
  });
})();

