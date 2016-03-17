(function() {
  'use strict';

  describe('Controller: InviteMessage', function() {
    var subject,
        $scope,
        SessionService,
        InviteService;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_, _$injector_) {
        $scope = _$rootScope_.$new(true);
        SessionService = _$injector_.get('SessionService');
        InviteService = _$injector_.get('InviteService');

        subject = _$controller_('InviteMessageCtrl', {
          $scope: $scope,
          SessionService: SessionService,
          InviteService: InviteService
        });
      });

      spyOn(SessionService, 'getCurrentUser');
    });

    describe('$on: toggle-save-state', function() {
      var $rootScope;
      beforeEach(function() {
        inject(function(_$rootScope_) {
          $rootScope = _$rootScope_;
        });
      });

      it('toggles the initial state of false to true', function() {
        subject.saving = false;
        $rootScope.$broadcast('toggle-saving-state');
        expect(subject.saving).toEqual(true);
      });


      it('toggles the the set state of true to false', function() {
        subject.saving = true;
        $rootScope.$broadcast('toggle-saving-state');
        expect(subject.saving).toEqual(false);
      });
    });

    describe('#save', function() {
      beforeEach(inject(function(_$controller_) {
        subject = _$controller_('InviteMessageCtrl', {
          $scope: $scope,
          SessionService: SessionService,
          InviteService: InviteService
        });
      }));

      it('delegates to InviteService#saveAssessment', function() {
        spyOn(InviteService, 'saveAssessment');
        subject.save({}, true);
        expect(InviteService.saveAssessment).toHaveBeenCalled();
      });
    });

    describe('#assignAndSave', function() {
      beforeEach(inject(function(_$controller_) {
        subject = _$controller_('InviteMessageCtrl', {
          $scope: $scope,
          SessionService: SessionService,
          InviteService: InviteService
        });
      }));

      it('delegates to InviteService#assignAndSaveAssesssment', function() {
        spyOn(InviteService, 'assignAndSaveAssessment');
        subject.assignAndSave({});
        expect(InviteService.assignAndSaveAssessment).toHaveBeenCalled();
      });
    });

    describe('#formattedDate', function() {
      it('uses the right format provided to MomentJS', function() {
        var result = subject.formattedDate(new Date('01/01/2001'));
        expect(result).toEqual('Jan 1, 2001');
      });
    });

    describe('$watch: district', function() {
      beforeEach(inject(function(_$controller_) {
        spyOn(InviteService, 'loadDistrict');
        subject = _$controller_('InviteMessageCtrl', {
          $scope: $scope,
          SessionService: SessionService,
          InviteService: InviteService
        });
      }));

      it('passes the district to the service', function() {
        $scope.$apply('district={"id": 1}');
        expect(InviteService.loadDistrict).toHaveBeenCalledWith({id: 1});
      });
    });

    describe('on initialization', function() {
      beforeEach(inject(function(_$controller_) {
        spyOn(InviteService, 'loadDistrict');
        spyOn(InviteService, 'loadScope');
        subject = _$controller_('InviteMessageCtrl', {
          $scope: $scope,
          SessionService: SessionService,
          InviteService: InviteService
        });
      }));

      it('invokes loadScope with the bound scope', function() {
        expect(InviteService.loadScope).toHaveBeenCalledWith($scope);
      });
    });
  });
})();
