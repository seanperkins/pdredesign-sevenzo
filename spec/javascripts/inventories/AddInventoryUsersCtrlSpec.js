(function() {
  'use strict';

  describe('Controller: AddInventoryUsers', function() {
    var $q,
        $scope,
        $rootScope,
        CreateService,
        subject;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$q_, _$controller_, _$rootScope_, $injector) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new(true);
        CreateService = $injector.get('CreateService');
      });
    });

    describe('on initialization', function() {
      beforeEach(function() {
        spyOn(CreateService, 'updateInvitableParticipantList').and.returnValue($q.when({}));

        inject(function(_$controller_) {
          subject = _$controller_('AddInventoryUsersCtrl', {
            $scope: $scope,
            CreateService: CreateService
          });
        });

        $rootScope.$apply();
      });

      it('retrieves initial invitables', function() {
        expect(CreateService.updateInvitableParticipantList).toHaveBeenCalled();
      });
    });

    describe('#addUser', function() {
      beforeEach(function() {
        spyOn(CreateService, 'createParticipant').and.returnValue($q.when({}));
        spyOn(CreateService, 'updateInvitableParticipantList').and.returnValue($q.when({}));
        inject(function(_$controller_) {
          subject = _$controller_('AddInventoryUsersCtrl', {
            $scope: $scope,
            CreateService: CreateService
          });
        });

        $rootScope.$apply();
        subject.addUser({id: 50});
      });

      it('creates participant', function() {
        expect(CreateService.createParticipant).toHaveBeenCalledWith({id: 50});
      });

      it('reloads participants', function() {
        expect(CreateService.updateInvitableParticipantList.calls.count()).toEqual(1);
      });
    });
  });
})();
