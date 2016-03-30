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
          $stateParams: {id: 1},
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

    describe('#createInvitation', function() {
      describe('with sendInvite set to "true"', function() {
        var $q;
        beforeEach(function() {
          inject(function(_$q_) {
            $q = _$q_;
          });
          spyOn(UserInvitation, 'create').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve({});
            return {$promise: deferred.promise};
          });
          $scope.sendInvite = 'true';
        });

        it('calls UserInvitation#create with the right parameters', function() {
          var userObject = {first_name: 'test'};
          $scope.createInvitation(userObject);
          expect(UserInvitation.create).toHaveBeenCalledWith({assessment_id: 1}, {
            first_name: 'test',
            send_invite: true
          });
        });
      });

      describe('with sendInvite set to "false"', function() {
        var $q;
        beforeEach(function() {
          inject(function(_$q_) {
            $q = _$q_;
          });
          spyOn(UserInvitation, 'create').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve({});
            return {$promise: deferred.promise};
          });
          $scope.sendInvite = 'false';
        });

        it('calls UserInvitation#create with the right parameters', function() {
          var userObject = {first_name: 'test'};
          $scope.createInvitation(userObject);
          expect(UserInvitation.create).toHaveBeenCalledWith({assessment_id: 1}, {
            first_name: 'test'
          });
        });
      });
    });
  });
})();