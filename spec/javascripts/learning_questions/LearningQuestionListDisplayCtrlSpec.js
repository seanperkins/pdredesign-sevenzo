(function() {
  'use strict';

  describe('Controller: LearningQuestionListDisplay', function() {
    var controller,
        LearningQuestionService,
        $scope,
        $window,
        $q;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_, _$q_, _$window_, $injector) {
        $q = _$q_;
        $window = _$window_;
        $scope = _$rootScope_.$new(true);

        LearningQuestionService = $injector.get('LearningQuestionService');

        $scope.context = 'testContextPrime';

        spyOn(LearningQuestionService, 'loadQuestions');

        controller = _$controller_('LearningQuestionListDisplayCtrl', {
          $scope: $scope,
          $stateParams: {id: 1},
          LearningQuestionService: LearningQuestionService,
          $window: $window
        });
      });
    });

    describe('on initialization', function() {

      it('invokes sets the context on the service', function() {
        expect(LearningQuestionService.context).toEqual('testContextPrime');
      });

      it('loads the questions via the service', function() {
        expect(LearningQuestionService.loadQuestions).toHaveBeenCalled();
      });
    });

    describe('#deleteLearningQuestion', function() {
      describe('when the entity is not editable', function() {
        beforeEach(function() {
          spyOn(LearningQuestionService, 'deleteLearningQuestion').and.returnValue($q.reject('no'));
          spyOn($window, 'confirm');
          controller.deleteLearningQuestion({editable: false});
        });

        it('does not prompt the user', function() {
          expect($window.confirm).not.toHaveBeenCalled();
        });

        it('does not make a request to delete the model', function() {
          expect(LearningQuestionService.deleteLearningQuestion).not.toHaveBeenCalled();
        });
      });

      describe('when the entity is editable', function() {
        var model = {editable: true};

        describe('when deletion is cancelled by the user', function() {
          beforeEach(function() {
            spyOn(LearningQuestionService, 'deleteLearningQuestion').and.returnValue($q.reject('no'));
            spyOn($window, 'confirm').and.returnValue(false);

            controller.deleteLearningQuestion(model);
          });

          it('does prompt the user', function() {
            expect($window.confirm).toHaveBeenCalled();
          });

          it('does not make a request to delete the model', function() {
            expect(LearningQuestionService.deleteLearningQuestion).not.toHaveBeenCalled();
          });
        });

        describe('when deletion is accepted by the user', function() {
          var $rootScope;

          beforeEach(inject(function(_$rootScope_) {
            $rootScope = _$rootScope_;
            spyOn($window, 'confirm').and.returnValue(true);
          }));

          describe('when the request is successful', function() {
            beforeEach(function() {
              spyOn(LearningQuestionService, 'deleteLearningQuestion').and.returnValue($q.when());
              controller.deleteLearningQuestion(model);
              $rootScope.$apply();
            });

            it('does prompt the user', function() {
              expect($window.confirm).toHaveBeenCalled();
            });

            it('makes a request to delete the model', function() {
              expect(LearningQuestionService.deleteLearningQuestion).toHaveBeenCalled();
            });

            it('reloads the questions list', function() {
              // Since we call this method once on initialization, and expect it to be called here too,
              // we expect 2 as its total call count.
              expect(LearningQuestionService.loadQuestions.calls.count()).toEqual(2);
            });
          });

          describe('when the request is unsuccessful', function() {
            beforeEach(function() {
              spyOn(LearningQuestionService, 'deleteLearningQuestion').and.returnValue($q.reject('no'));
              controller.deleteLearningQuestion(model);
              $rootScope.$apply();
            });

            it('does prompt the user', function() {
              expect($window.confirm).toHaveBeenCalled();
            });

            it('makes a request to delete the model', function() {
              expect(LearningQuestionService.deleteLearningQuestion).toHaveBeenCalled();
            });

            it('does not reload the questions list', function() {
              // Since we call this method once on initialization, and don't expect it to be called here,
              // we expect 1 as its total call count.
              expect(LearningQuestionService.loadQuestions.calls.count()).toEqual(1);
            });
          });
        });
      });
    });

    describe('#updateLearningQuestion', function() {
      describe('when the entity is not editable', function() {
        beforeEach(function() {
          spyOn(LearningQuestionService, 'updateLearningQuestion').and.returnValue($q.reject('no'));
          spyOn($window, 'confirm');
          controller.updateLearningQuestion({editable: false});
        });

        it('does not prompt the user', function() {
          expect($window.confirm).not.toHaveBeenCalled();
        });

        it('does not make a request to update the model', function() {
          expect(LearningQuestionService.updateLearningQuestion).not.toHaveBeenCalled();
        });
      });

      describe('when the entity is editable', function() {
        var model = {editable: true};
        var $rootScope;

        beforeEach(function() {
          inject(function(_$rootScope_) {
            $rootScope = _$rootScope_;
          });
          spyOn($window, 'confirm').and.returnValue(true);
        });

        describe('when the request is successful', function() {
          beforeEach(function() {
            spyOn(LearningQuestionService, 'updateLearningQuestion').and.returnValue($q.when({}));
            controller.updateLearningQuestion(model);
            $rootScope.$apply();
          });

          it('loads in the list of questions from the service', function() {
            expect(LearningQuestionService.loadQuestions.calls.count()).toEqual(2);
          });
        });

        describe('when the request is unsuccessful', function() {
          beforeEach(function() {
            spyOn(LearningQuestionService, 'updateLearningQuestion').and.returnValue($q.reject('no'));
            controller.updateLearningQuestion(model);
            $rootScope.$apply();
          });

          it('loads in the list of questions from the service', function() {
            expect(LearningQuestionService.loadQuestions.calls.count()).toEqual(2);
          });
        });
      });
    });

    describe('#validate', function() {
      beforeEach(function() {
        spyOn(LearningQuestionService, 'validate');
        controller.validate('foo');
      });

      it('delegates to LearningQuestionService#validate', function() {
        expect(LearningQuestionService.validate).toHaveBeenCalledWith('foo');
      });
    });
  });
})();