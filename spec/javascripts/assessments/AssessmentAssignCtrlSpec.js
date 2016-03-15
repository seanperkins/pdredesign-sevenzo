(function() {
  'use strict';

  describe('Controller:  AssessmentAssign', function() {
    var subject,
        $controller,
        $scope,
        $timeout,
        $anchorScroll,
        $location,
        $stateParams,
        $httpBackend,
        SessionService,
        Assessment,
        Participant,
        Rubric;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_, _$timeout_, _$location_, _$anchorScroll_, _$httpBackend_, $injector) {
        $scope = _$rootScope_.$new(true);
        $timeout = _$timeout_;
        $location = _$location_;
        $anchorScroll = _$anchorScroll_;
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;

        SessionService = $injector.get('SessionService');
        Assessment = $injector.get('Assessment');
        Participant = $injector.get('Participant');
        Rubric = $injector.get('Rubric');
      });
    });

    describe('#fetchAssessment', function() {
      describe('when an assessment with ID of 1 is found', function() {
        describe('when the user has a matching district', function() {
          beforeEach(function() {
            $stateParams = {id: 1};
            spyOn(SessionService, 'getCurrentUser').and.returnValue(
                {
                  districts: [
                    {
                      id: 19
                    },
                    {
                      id: 12
                    }
                  ]
                });
            $httpBackend.expect('GET', '/v1/assessments/1/participants').respond([]);
            $httpBackend.expect('GET', '/v1/assessments/1').respond({id: 7, district_id: 12});

            subject = $controller('AssessmentAssignCtrl', {
              $scope: $scope,
              $timeout: $timeout,
              $anchorScroll: $anchorScroll,
              $location: $location,
              $stateParams: $stateParams,
              SessionService: SessionService,
              Assessment: Assessment,
              Participant: Participant,
              Rubric: Rubric
            });

            $httpBackend.flush();
          });

          it('binds the assessment to the scope (by virtue of its ID)', function() {
            expect($scope.assessment.id).toEqual(7);
          });

          it('sets the scope district correctly', function() {
            expect($scope.district).toEqual({id: 12});
          });

          afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
          });
        });

        describe('when the user does not have a matching district', function() {
          beforeEach(function() {
            $stateParams = {id: 1};
            spyOn(SessionService, 'getCurrentUser').and.returnValue(
                {
                  districts: [
                    {
                      id: 30
                    },
                    {
                      id: 13
                    }
                  ]
                });
            $httpBackend.expect('GET', '/v1/assessments/1/participants').respond([]);
            $httpBackend.expect('GET', '/v1/assessments/1').respond({id: 7, district_id: 12});

            subject = $controller('AssessmentAssignCtrl', {
              $scope: $scope,
              $timeout: $timeout,
              $anchorScroll: $anchorScroll,
              $location: $location,
              $stateParams: $stateParams,
              SessionService: SessionService,
              Assessment: Assessment,
              Participant: Participant,
              Rubric: Rubric
            });

            $httpBackend.flush();
          });

          it('binds the assessment to the scope (by virtue of its ID)', function() {
            expect($scope.assessment.id).toEqual(7);
          });

          it('sets the district to the first entry in the list', function() {
            expect($scope.district).toEqual({id: 30});
          });

          afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
          });
        });
      });

      describe('when an assessment with ID 1 is not found', function() {
        beforeEach(function() {
          $stateParams = {id: 1};
          spyOn(SessionService, 'getCurrentUser').and.returnValue(
              {
                districts: [
                  {
                    id: 19
                  },
                  {
                    id: 12
                  }
                ]
              });
          $httpBackend.expect('GET', '/v1/assessments/1/participants').respond(400);
          $httpBackend.when('GET', '/v1/assessments/1').respond(400);

          subject = $controller('AssessmentAssignCtrl', {
            $scope: $scope,
            $timeout: $timeout,
            $anchorScroll: $anchorScroll,
            $location: $location,
            $stateParams: $stateParams,
            SessionService: SessionService,
            Assessment: Assessment,
            Participant: Participant,
            Rubric: Rubric
          });

          $httpBackend.flush();
        });

        it('does not set the assessment', function() {
          expect($scope.assessment).toBeUndefined();
        });

        afterEach(function() {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
        });
      });
    });

    describe('#assignAndSave', function() {
      beforeEach(function() {
        $stateParams = {id: 1};
        spyOn(SessionService, 'getCurrentUser').and.returnValue(
            {
              districts: [
                {
                  id: 19
                }
              ]
            });
        $httpBackend.expect('GET', '/v1/assessments/1/participants').respond([]);
        $httpBackend.expect('GET', '/v1/assessments/1').respond({});

        subject = $controller('AssessmentAssignCtrl', {
          $scope: $scope,
          $timeout: $timeout,
          $anchorScroll: $anchorScroll,
          $location: $location,
          $stateParams: $stateParams,
          SessionService: SessionService,
          Assessment: Assessment,
          Participant: Participant,
          Rubric: Rubric
        });

        $httpBackend.flush();
      });

      describe('when the assessment message is null', function() {
        var assessment = {message: null};

        it('sets alertError to true', function() {
          $scope.assignAndSave(assessment);
          expect($scope.alertError).toBe(true);
        });
      });

      describe('when the assessment message is blank', function() {
        var assessment = {message: ''};

        it('sets alertError to true', function() {
          $scope.assignAndSave(assessment);
          expect($scope.alertError).toBe(true);
        });
      });

      describe('when the alert dialog is not accepted', function() {
        var assessment = {message: 'This is a test!'};
        var $window;
        beforeEach(function() {
          inject(function(_$window_) {
            $window = _$window_;
          });
          subject.$window = $window;
          spyOn($window, 'confirm').and.returnValue(false);
          spyOn($scope, 'save');
        });

        it('does not call the save method on the scope', function() {
          $scope.assignAndSave(assessment);
          expect($scope.save).not.toHaveBeenCalled();
        });
      });


      describe('when the alert dialog is accepted', function() {
        var assessment = {message: 'This is a test!'};
        var $window;
        beforeEach(function() {
          inject(function(_$window_) {
            $window = _$window_;
          });
          subject.$window = $window;
          spyOn($window, 'confirm').and.returnValue(true);
          spyOn($scope, 'save').and.returnValue({then: function(callback) {
            callback();
          }});
        });

        it('does call the save method on the scope', function() {
          $scope.assignAndSave(assessment);
          expect($scope.save).toHaveBeenCalled();
        });

        it('sets the location to /assessments', function() {
          $scope.assignAndSave(assessment);
          expect($location.path()).toEqual('/assessments');
        });
      });
    });
  });
})();
