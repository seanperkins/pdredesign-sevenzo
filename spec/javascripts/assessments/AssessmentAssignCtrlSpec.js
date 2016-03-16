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

        it('does not invoke #save', function() {
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
          spyOn($scope, 'save').and.returnValue({
            then: function(callback) {
              callback();
            }
          });
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

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });
    });

    describe('#save', function() {
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
        $httpBackend.when('GET', '/v1/assessments/1').respond({});

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

      describe('when the assessment name is blank', function() {
        beforeEach(function() {
          var assessment = {name: ''};
          spyOn($scope, 'error');
          $scope.save(assessment, true);
        });

        it('invokes #error', function() {
          expect($scope.error).toHaveBeenCalledWith('Assessment needs a name!');
        });
      });

      describe('when the assessment name is not blank', function() {
        var assessment, inputField;

        beforeEach(function() {
          assessment = {id: 1, name: 'This is a test'};
          inject(function(_$compile_) {
            inputField = angular.element('<input class="form-control" id="due-date" data-format="dd/MM/yyyy" name="due-date">');
            angular.element(document.body).append(inputField);
            inputField.val('08/01/1997');
            _$compile_(inputField)($scope);
          });
        });

        it('pulls the date value from the input form', function() {
          $scope.save(assessment, true);
          expect(assessment.due_date).toEqual(moment('08/01/1997', 'MM/DD/YYYY').toISOString());
        });

        describe('when assign is true', function() {
          it('sets assessment.assign to true', function() {
            $scope.save(assessment, true);
            expect(assessment.assign).toEqual(true);
          });
        });

        describe('when assign is false', function() {
          it('leaves assessment.assign undefined', function() {
            $scope.save(assessment, false);
            expect(assessment.assign).toBeUndefined();
          });
        });

        describe('when the save is successful', function() {
          var successfulAssessment = {
            id: 1,
            name: 'This is a test',
            district_id: 19,
            due_date: moment('08/01/1997', 'MM/DD/YYYY').toISOString(),
            assign: true
          };
          beforeEach(function() {
            $httpBackend.expect('PUT', '/v1/assessments/1', successfulAssessment).respond(201);
          });

          it('sets the scope saving value to false', function() {
            $scope.save(successfulAssessment, true);
            $httpBackend.flush();
            expect($scope.saving).toEqual(false);
          });

          it('invokes #success function with the correct parameter', function() {
            spyOn($scope, 'success');
            $scope.save(successfulAssessment, true);
            $httpBackend.flush();
            expect($scope.success).toHaveBeenCalledWith('Assessment Saved!');
          });

          afterEach(function() {
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
          });
        });

        describe('when the save is unsuccessful', function() {
          var unsuccessfulAssessment = {
            id: 12,
            name: 'This is a test',
            district_id: 19,
            due_date: moment('08/01/1997', 'MM/DD/YYYY').toISOString(),
            assign: true
          };
          beforeEach(function() {
            $httpBackend.expect('PUT', '/v1/assessments/12', unsuccessfulAssessment).respond(400);
          });

          it('sets the scope saving value to false', function() {
            $scope.save(unsuccessfulAssessment, true);
            $httpBackend.flush();
            expect($scope.saving).toEqual(false);
          });

          it('invokes #error function with the correct parameter', function() {
            spyOn($scope, 'error');
            $scope.save(unsuccessfulAssessment, true);
            $httpBackend.flush();
            expect($scope.error).toHaveBeenCalledWith('Could not save assessment');
          });

          afterEach(function() {
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
          });
        });

        afterEach(function() {
          inputField.remove();
        });
      });
    });
  });
})();
