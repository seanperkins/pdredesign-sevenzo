(function () {
  'use strict';
  describe('Controller: AssessmentsCtrl', function () {
    var subject,
      $scope,
      $rootScope,
      $q,
      SessionService;

    beforeEach(function () {
      module('PDRClient');
      inject(function (_$controller_, _$rootScope_, _SessionService_, _$q_) {

        SessionService = _SessionService_;
        $rootScope = _$rootScope_;

        spyOn(SessionService, 'getCurrentUser')
          .and.returnValue({role: 'member'});

        $scope = _$rootScope_.$new(true);
        subject = _$controller_('AssessmentsCtrl', {
          $scope: $scope,
          SessionService: SessionService,
          assessments: {}
        });
      });
    });

    describe('#districtOptions', function () {
      it('returns all unique districts', function () {
        var assessments = [
          {district_name: 'first'},
          {district_name: 'first'},
          {district_name: 'second'},
          {district_name: 'second'}
        ];

        var districts = subject.districtOptions(assessments);
        expect(districts).toEqual(['first', 'second'])
      });
    });

    describe('#statusesOptions', function () {
      it('returns all unique statuses', function () {
        var assessments = [
          {status: 'draft'},
          {status: 'consensus'},
          {status: 'draft'},
          {status: 'consensus'}
        ];

        var statuses = subject.statusesOptions(assessments);
        expect(statuses).toEqual(['draft', 'consensus'])
      });
    });

    describe('#permissionsFilter', function () {
      it('Organizer should return is_facilitator true', function () {
        var permission = subject.permissionsFilter('Organizer');
        expect(permission).toEqual({is_facilitator: true})
      });

      it('Participant should return is_participant true', function () {
        var permission = subject.permissionsFilter('Observer');
        expect(permission).toEqual({is_participant: true})
      });
    });
  });
})();
