(function() {
  'use strict';

  describe('Controller: ModifySchedule', function() {
    var $scope,
        AssessmentService,
        AlertService,
        $q,
        $rootScope,
        subject;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$rootScope_, _AssessmentService_, _AlertService_, _$q_, _$controller_) {
        $rootScope = _$rootScope_.$new(true);
        $scope = _$rootScope_.$new(true);
        AssessmentService = _AssessmentService_;
        AlertService = _AlertService_;
        $q = _$q_;
        subject = _$controller_('ModifyScheduleCtrl', {
          $scope: $scope,
          AssessmentService: AssessmentService,
          AlertService: AlertService
        });
      });
    });

    describe('on initialization', function() {
      beforeEach(function() {
        spyOn(AlertService, 'flush');
        inject(function(_$rootScope_, _AssessmentService_, _AlertService_, _$q_, _$controller_) {
          AlertService = _AlertService_;
          subject = _$controller_('ModifyScheduleCtrl', {
            $scope: _$rootScope_.$new(true),
            AssessmentService: _AssessmentService_,
            AlertService: AlertService
          });
        });
      });

      it('invokes AlertService#flush', function() {
        expect(AlertService.flush).toHaveBeenCalled();
      });
    });

    describe('#alerts', function() {
      beforeEach(function() {
        spyOn(AlertService, 'getAlerts');
        subject.alerts();
      });

      it('invokes AlertService#getAlerts', function() {
        expect(AlertService.getAlerts).toHaveBeenCalled();
      });
    });

    describe('#updateAssessment', function() {
      var meetingDateDom,
          dueDateDom;
      describe('when the assessment submission is successful', function() {
        var assessment = {};
        var closeSpy = jasmine.createSpy('close');

        beforeEach(function() {
          inject(function(_$compile_) {
            meetingDateDom = angular.element('<input id="meeting-date">');
            dueDateDom = angular.element('<input id="due-date">');

            dueDateDom.val('11/18/2017');
            meetingDateDom.val('12/18/2017');

            angular.element(document.body).append(dueDateDom);
            angular.element(document.body).append(meetingDateDom);
            _$compile_(meetingDateDom)($scope);
            _$compile_(dueDateDom)($scope);
          });
          subject.assessment = assessment;
          spyOn(AssessmentService, 'save').and.returnValue($q.when({}));
          $scope.close = closeSpy;

          subject.updateAssessment();
          $rootScope.$digest();
        });

        afterEach(function() {
          meetingDateDom.remove();
          dueDateDom.remove();
        });



        it('sets the assessment due date', function() {
          expect(assessment.due_date).toEqual(moment('11/18/2017', 'MM/DD/YYYY').toISOString());
        });

        it('sets the assessment meeting date', function() {
          expect(assessment.meeting_date).toEqual(moment('12/18/2017', 'MM/DD/YYYY').toISOString());
        });

        it('invokes $scope.close()', function() {
          expect(closeSpy).toHaveBeenCalled();
        });
      });

      describe('when the assessment submission is unsuccessful', function() {
        var assessment = {};

        beforeEach(function() {
          inject(function(_$compile_) {
            meetingDateDom = angular.element('<input id="meeting-date">');
            dueDateDom = angular.element('<input id="due-date">');

            dueDateDom.val('11/18/2017');
            meetingDateDom.val('12/18/2017');

            angular.element(document.body).append(dueDateDom);
            angular.element(document.body).append(meetingDateDom);
            _$compile_(meetingDateDom)($scope);
            _$compile_(dueDateDom)($scope);
          });
          subject.assessment = assessment;
          spyOn(AssessmentService, 'save').and.returnValue($q.reject({
                data: {
                  errors: {
                    bad: ['Not good!']
                  }
                }
              }
          ));
          spyOn(AlertService, 'addAlert');

          subject.updateAssessment();
          $rootScope.$digest();
        });

        afterEach(function() {
          meetingDateDom.remove();
          dueDateDom.remove();
        });

        it('sends the error to AlertService#addAlert', function() {
          expect(AlertService.addAlert).toHaveBeenCalledWith('danger', 'bad Not good!');
        });
      });
    });
  });
})();