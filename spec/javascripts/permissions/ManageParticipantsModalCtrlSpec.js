(function() {
  'use strict';

  describe('Controller: ManageParticipantsModal', function() {
    var subject,
        $scope,
        $window,
        $stateParams,
        AssessmentPermission,
        Participant;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$rootScope_, _$window_, _$controller_, $injector) {
        $scope = _$rootScope_.$new(true);
        $window = _$window_;
        $stateParams = {id: 1};

        AssessmentPermission = $injector.get('AssessmentPermission');
        Participant = $injector.get('Participant');

        subject = _$controller_('ManageParticipantsModalCtrl', {
          $scope: $scope,
          $window: $window,
          $stateParams: $stateParams,
          AssessmentPermission: AssessmentPermission,
          Participant: Participant
        });
      });
    });

    describe('#hideModal', function() {
      beforeEach(function() {
        spyOn($scope, '$emit');
      });

      it('emits the close-manage-participants-modal event', function() {
        subject.hideModal();
        expect($scope.$emit).toHaveBeenCalledWith('close-manage-participants-modal');
      });
    });

    describe('#humanPermissionName', function() {
      it('it converts an empty string to None', function() {
        expect(subject.humanPermissionName('')).toEqual('None');
      });

      it('returns the string as itself', function() {
        expect(subject.humanPermissionName('Human')).toEqual('Human');
      });
    });


    describe('#performPermissionsAction', function() {
      var $q;

      beforeEach(inject(function(_$q_) {
        $q = _$q_;
      }));

      it('calls the given function', function() {
        this.performExample = function() {
        };

        spyOn(this, 'performExample').and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve(true);
          return {$promise: deferred.promise};
        });

        subject.performPermissionsAction(this.performExample);
        expect(this.performExample).toHaveBeenCalled();

      });
    });
  });
})();