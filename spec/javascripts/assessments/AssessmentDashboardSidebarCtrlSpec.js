(function () {
  'use strict';

  describe('Controller: AssessmentDashboardSidebarCtrl', function () {
    var $scope,
      $modal,
      $location,
      $state,
      $stateParams,
      Assessment,
      AssessmentMessage,
      $q,
      $rootScope,
      subject;

    beforeEach(function () {
      module('PDRClient');

      inject(function (_$rootScope_, _$modal_, _$location_, _$state_, _Assessment_, _AssessmentMessage_, _$q_, _$controller_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new(true);
        $modal = _$modal_;
        $location = _$location_;
        Assessment = _Assessment_;
        AssessmentMessage = _AssessmentMessage_;
        $q = _$q_;
        $state = _$state_;
        $stateParams = {id: 1};

        spyOn(Assessment, 'get').and.returnValue({share_token: '1'});

        subject = _$controller_('AssessmentDashboardSidebarCtrl', {
          $scope: $scope,
          $modal: $modal,
          $location: $location,
          $state: $state,
          $stateParams: $stateParams,
          Assessment: Assessment,
          AssessmentMessage: AssessmentMessage
        });
      });
    });

    describe('#sendReminder', function () {
      beforeEach(function () {
        spyOn(subject, 'close');
        spyOn(AssessmentMessage, 'save').and.returnValue({$promise: $q.when({})});
      });

      it('sends a reminder to the server', function () {
        subject.sendReminder('Something');
        $rootScope.$digest();
        expect(AssessmentMessage.save).toHaveBeenCalledWith({assessment_id: 1}, {message: 'Something'});
      });

      it('closes the modal', function () {
        subject.sendReminder('Something');
        $rootScope.$digest();
        expect(subject.close).toHaveBeenCalled();
      });
    });

    describe('#postMeetingDate', function () {
      describe('when the meeting date is set for next week', function () {
        var nextWeek = moment().add(7, 'days').toDate();

        beforeEach(function () {
          subject.assessment.meeting_date = nextWeek;
        });

        it('returns false', function () {
          expect(subject.postMeetingDate()).toEqual(false);
        });
      });

      describe('when the meeting date is not set on the assessment', function () {
        beforeEach(function () {
          subject.assessment.meeting_date = null;
        });

        it('returns false', function () {
          expect(subject.postMeetingDate()).toEqual(false);
        });
      });

      describe('when the meeting date is set for a day prior', function () {
        var yesterday = moment().subtract(1, 'days').toDate();

        beforeEach(function () {
          subject.assessment.meeting_date = yesterday;
        });

        it('returns true', function () {
          expect(subject.postMeetingDate()).toEqual(true);
        });
      });
    });

    describe('#preMeetingDate', function () {
      describe('when the meeting date is set for next week', function () {
        var nextWeek = moment().add(7, 'days').toDate();
        beforeEach(function () {
          subject.assessment.meeting_date = nextWeek;
        });

        it('returns true', function () {
          expect(subject.preMeetingDate()).toEqual(true);
        });
      });

      describe('when the meeting date is not set on the assessment', function () {
        beforeEach(function () {
          subject.assessment.meeting_date = null;
        });

        it('returns false', function () {
          expect(subject.preMeetingDate()).toEqual(false);
        });
      });

      describe('when the meeting date is set for a day prior', function () {
        var yesterday = moment().subtract(1, 'days').toDate();
        beforeEach(function () {
          subject.assessment.meeting_date = yesterday;
        });

        it('returns false', function () {
          expect(subject.preMeetingDate()).toEqual(false);
        });
      });
    });

    describe('#noMeetingDate', function () {
      describe('when a meeting date is not present', function () {
        beforeEach(function () {
          subject.assessment.meeting_date = null;
        });

        it('returns true', function () {
          expect(subject.noMeetingDate()).toEqual(true);
        });
      });

      describe('when a meeting date is present', function () {
        beforeEach(function () {
          subject.assessment.meeting_date = new Date();
        });

        it('returns false', function () {
          expect(subject.noMeetingDate()).toEqual(false);
        });
      });
    });

    describe('#reportPresent', function () {
      describe('if the assessment has been submitted', function () {
        beforeEach(function () {
          subject.assessment.submitted_at = new Date();
        });
        it('returns true', function () {
          expect(subject.reportPresent()).toEqual(true);
        });
      });

      describe('if the assessment has not been submitted', function () {
        beforeEach(function () {
          subject.assessment.submitted_at = null;
        });

        it('returns false', function () {
          expect(subject.reportPresent()).toEqual(false);
        });
      });
    });


    describe('#redirectToCreateConsensus', function () {
      beforeEach(function () {
        spyOn(subject, 'close');
      });

      it('sends user to correct URL by passing scope.id', function () {
        subject.id = 1;
        subject.redirectToCreateConsensus();
        expect($location.path()).toEqual('/assessments/1/consensus')
      });

      it('closes the currently open modal', function () {
        subject.redirectToCreateConsensus();
        expect(subject.close).toHaveBeenCalled();
      });
    });

    describe('#consensusStarted', function () {
      describe('when the status is assessment', function () {
        beforeEach(function () {
          subject.assessment.status = 'assessment';
        });

        it('returns false', function () {
          expect(subject.consensusStarted()).toEqual(false);
        });
      });

      describe('when the status is consensus', function () {
        beforeEach(function () {
          subject.assessment.status = 'consensus';
        });

        it('returns true', function () {
          expect(subject.consensusStarted()).toEqual(true);
        });
      });
    });
  });
})();
