(function() {
  'use strict';

  describe('Controller: InviteUser', function() {
    var subject,
        $scope,
        $modal,
        $httpBackend,
        UserInvitation;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_, _$httpBackend_, $injector) {
        $scope = _$rootScope_.$new(true);
        $modal = $injector.get('$modal');
        $httpBackend = _$httpBackend_;
        UserInvitation = $injector.get('UserInvitation');
        subject = _$controller_('InviteUserCtrl', {
          $scope: $scope,
          $modal: $modal,
          UserInvitation: UserInvitation
        });
      });
    });

    it('shows an invite modal', function() {
      spyOn($modal, 'open');
      $scope.showInviteUserModal();
      expect($modal.open).toHaveBeenCalled();
    });

    describe('with mock request', function() {
      beforeEach(function() {
        $scope.assessmentId = 1;
        spyOn($scope, '$emit');
        spyOn($scope, 'closeModal');
        $httpBackend
            .expectPOST('/v1/assessments/1/user_invitations', {first_name: 'test'})
            .respond({});
      });

      it('creates a UserInvitation', function() {
        $scope.createInvitation({first_name: 'test'});
        $httpBackend.flush();
      });

      it('emits update_participants', function() {
        $scope.createInvitation({first_name: 'test'});
        $httpBackend.flush();
        expect($scope.$emit).toHaveBeenCalledWith('update_participants');
      });

      it('closes the invite modal', function() {
        $scope.createInvitation({first_name: 'test'});
        $httpBackend.flush();
        expect($scope.closeModal).toHaveBeenCalled();
      });
    });
  });
})();