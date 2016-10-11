(function () {
  'use strict';

  describe('Controller: CreateParticipants', function () {
    var subject,
      $rootScope,
      $stateParams,
      $q,
      SessionService,
      CreateService;

    beforeEach(function () {
      module('PDRClient');
      inject(function (_$controller_, _$rootScope_, _$q_, $injector) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        SessionService = $injector.get('SessionService');
        CreateService = $injector.get('CreateService');

        CreateService.context = 'assessment';
        spyOn(CreateService, 'loadParticipants').and.returnValue($q.when([]));

        subject = _$controller_('CreateParticipantsCtrl', {
          $scope: $rootScope.$new(true),
          $stateParams: $stateParams,
          SessionService: SessionService,
          CreateService: CreateService
        });
      });
    });

    describe('on initialization', function () {
      beforeEach(function () {
        inject(function (_$controller_) {
          subject = _$controller_('CreateParticipantsCtrl', {
            $scope: $rootScope.$new(true),
            $stateParams: $stateParams,
            SessionService: SessionService,
            CreateService: CreateService
          });
        });
        $rootScope.$apply();
      });

      it('calls CreateService#loadParticipants', function () {
        expect(CreateService.loadParticipants).toHaveBeenCalled();
      });
    });

    describe('$on: update_participants', function () {
      beforeEach(function () {
        spyOn(SessionService, 'getCurrentUser').and.returnValue({districts: [{id: 19}]});
        spyOn(subject, 'updateParticipantsList');
      });

      it('invokes the correct method', function () {
        $rootScope.$broadcast('update_participants');
        expect(subject.updateParticipantsList).toHaveBeenCalled();
      });
    });

    describe('#isNetworkPartner', function () {
      beforeEach(function () {
        spyOn(SessionService, 'getCurrentUser').and.returnValue({districts: [{id: 19}]});
        spyOn(SessionService, 'isNetworkPartner');
      });

      it('delegates to SessionService', function () {
        subject.isNetworkPartner();
        expect(SessionService.isNetworkPartner).toHaveBeenCalled();
      });
    });

    describe('#removeParticipant', function () {
      describe('when successful', function () {
        var user = {id: 5, participant_id: 17};
        beforeEach(function () {
          inject(function (_$controller_) {
            subject = _$controller_('CreateParticipantsCtrl', {
              $scope: $rootScope.$new(true),
              $stateParams: $stateParams,
              SessionService: SessionService,
              CreateService: CreateService
            });
          });

          spyOn(SessionService, 'getCurrentUser').and.returnValue({districts: [{id: 19}]});
          spyOn(CreateService, 'removeParticipant').and.returnValue($q.when({}));
          spyOn(subject, 'updateParticipantsList');

          subject.removeParticipant(user);
          $rootScope.$apply();
        });

        it('calls #updateParticipantsList', function () {
          expect(subject.updateParticipantsList).toHaveBeenCalled();
        });
      });

      describe('when unsuccessful', function () {
        var user = {id: 5, participant_id: 17};
        beforeEach(function () {
          spyOn(SessionService, 'getCurrentUser').and.returnValue({districts: [{id: 19}]});
          spyOn(CreateService, 'removeParticipant').and.returnValue($q.reject('no'));

          inject(function (_$controller_) {
            subject = _$controller_('CreateParticipantsCtrl', {
              $scope: $rootScope.$new(true),
              $stateParams: $stateParams,
              SessionService: SessionService,
              CreateService: CreateService
            });
          });
          spyOn(subject, 'updateParticipantsList');

          subject.removeParticipant(user);
          $rootScope.$apply();
        });

        it('does not call #updateParticipantsList', function () {
          expect(subject.updateParticipantsList).not.toHaveBeenCalled();
        });
      });
    });

    describe('#updateParticipantsList', function () {
      beforeEach(function () {
        inject(function (_$controller_) {
          subject = _$controller_('CreateParticipantsCtrl', {
            $scope: $rootScope.$new(true),
            $stateParams: $stateParams,
            SessionService: SessionService,
            CreateService: CreateService
          });
        });
      });

      describe('when CreateService#updateParticipantList and CreateService#updateInvitableParticipantList are successful', function () {
        beforeEach(function () {
          spyOn(CreateService, 'updateParticipantList').and.returnValue($q.when([{id: 1}]));
          spyOn(CreateService, 'updateInvitableParticipantList').and.returnValue($q.when([{id: 178}]));
          subject.updateParticipantsList();
          $rootScope.$apply();
        });

        it('places the value into participants', function () {
          expect(subject.participants[0].id).toEqual(1)
        });

        it('places the value into invitableParticipants', function () {
          expect(subject.invitableParticipants[0].id).toEqual(178)
        });
      });

      describe('when CreateService#updateParticipantList is unsuccessful', function () {
        beforeEach(function () {
          spyOn(CreateService, 'emitError');
          spyOn(CreateService, 'updateParticipantList').and.returnValue($q.reject('no thanks'));
          spyOn(CreateService, 'updateInvitableParticipantList').and.returnValue($q.when([{id: 178}]));
          subject.updateParticipantsList();
          $rootScope.$apply();
        });

        it('emits the error', function () {
          expect(CreateService.emitError).toHaveBeenCalledWith('Could not update participants list');
        });
      });

      describe('when CreateService#updateInvitableParticipantList is unsuccessful', function () {
        beforeEach(function () {
          spyOn(CreateService, 'emitError');
          spyOn(CreateService, 'updateParticipantList').and.returnValue($q.when([{id: 1}]));
          spyOn(CreateService, 'updateInvitableParticipantList').and.returnValue($q.reject('no thanks'));
          ;
          subject.updateParticipantsList();
          $rootScope.$apply();
        });

        it('emits the error', function () {
          expect(CreateService.emitError).toHaveBeenCalledWith('Could not update invitable participants list');
        });
      });

      describe('when CreateService#updateParticipantList and CreateService#updateInvitableParticipantList are unsuccessful', function () {
        beforeEach(function () {
          spyOn(CreateService, 'emitError');
          spyOn(CreateService, 'updateParticipantList').and.returnValue($q.reject('no thanks'));
          spyOn(CreateService, 'updateInvitableParticipantList').and.returnValue($q.reject('seriously, no thanks'));
          subject.updateParticipantsList();
          $rootScope.$apply();
        });

        it('emits the error twice', function () {
          expect(CreateService.emitError.calls.count()).toEqual(2);
        });
      });
    });
  });
})();