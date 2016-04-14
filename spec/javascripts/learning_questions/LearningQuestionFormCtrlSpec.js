(function() {
  'use strict';

  describe('Controller: LearningQuestionForm', function() {
    var controller,
        LearningQuestionService,
        $scope,
        $q;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_, _$q_, $injector) {
        $q = _$q_;
        $scope = _$rootScope_.$new(true);
        LearningQuestionService = $injector.get('LearningQuestionService');

        $scope.learningQuestionForm = {};
        $scope.context = 'testContext';

        controller = _$controller_('LearningQuestionFormCtrl', {
          $stateParams: {id: 1},
          $scope: $scope,
          LearningQuestionService: LearningQuestionService
        });
      });
    });

    describe('on initialization', function() {
      it('invokes sets the context on the service', function() {
        expect(LearningQuestionService.context).toEqual('testContext');
      });
    });

    describe('#clearInputForm', function() {
      var model = {body: 'Hello there'};

      beforeEach(function() {
        controller.clearInputForm(model);
      });

      it('blanks out the model body', function() {
        expect(model.body).toEqual('');
      });
    });

    describe('#validate', function() {
      var data = 'This is some data';

      beforeEach(function() {
        spyOn(LearningQuestionService, 'validate');
        controller.validate(data);
      });

      it('delegates to LearningQuestionService', function() {
        expect(LearningQuestionService.validate).toHaveBeenCalledWith(data);
      });
    });

    describe('#createLearningQuestion', function() {
      describe('when entity creation is successful', function() {
        var $rootScope;
        beforeEach(function() {
          inject(function(_$rootScope_) {
            $rootScope = _$rootScope_;
          });

          spyOn(LearningQuestionService, 'createLearningQuestion').and.returnValue($q.when({}));
          spyOn(LearningQuestionService, 'validate').and.returnValue(undefined);
          spyOn(LearningQuestionService, 'loadQuestions');
          spyOn(controller, 'clearInputForm');

          controller.createLearningQuestion({body: 'Hello there'});
          $rootScope.$apply();
        });

        it('invokes validation through LearningQuestionService', function() {
          expect(LearningQuestionService.validate).toHaveBeenCalled();
        });

        it('invokes LearningQuestionService#loadQuestions', function() {
          expect(LearningQuestionService.loadQuestions).toHaveBeenCalled();
        });

        it('sets the form on the scope to be valid', function() {
          expect($scope.learningQuestionForm.$invalid).toEqual(false);
        });

        it('invokes LearningQuestionFormCtrl#clearInputForm', function() {
          expect(controller.clearInputForm).toHaveBeenCalledWith({body: 'Hello there'});
        });
      });

      describe('when entity creation is unsuccessful through the API', function() {
        var $rootScope;
        beforeEach(function() {
          inject(function(_$rootScope_) {
            $rootScope = _$rootScope_;
          });

          spyOn(LearningQuestionService, 'createLearningQuestion').and.returnValue($q.reject('nope'));
          spyOn(LearningQuestionService, 'validate').and.returnValue(undefined);
          spyOn(LearningQuestionService, 'loadQuestions');
          spyOn(controller, 'clearInputForm');

          controller.createLearningQuestion({body: 'Hello there'});
          $rootScope.$apply();
        });

        it('invokes validation through LearningQuestionService', function() {
          expect(LearningQuestionService.validate).toHaveBeenCalled();
        });

        it('does not invoke LearningQuestionService#loadQuestions', function() {
          expect(LearningQuestionService.loadQuestions).not.toHaveBeenCalled();
        });

        it('does not invoke LearningQuestionFormCtrl#clearInputForm', function() {
          expect(controller.clearInputForm).not.toHaveBeenCalled();
        });
      });

      describe('when entity creation is rejected via validation', function() {
        var $rootScope;
        beforeEach(function() {
          inject(function(_$rootScope_) {
            $rootScope = _$rootScope_;
          });

          spyOn(LearningQuestionService, 'validate').and.returnValue('You have errors');
          spyOn(LearningQuestionService, 'createLearningQuestion').and.returnValue($q.reject('THIS SHOULD NOT BE INVOKED!'));

          controller.createLearningQuestion({body: 'Hello there'});
          $rootScope.$apply();
        });

        it('sets the error on the controller', function() {
          expect(controller.error).toEqual('You have errors');
        });

        it('sets the form on the scope to be invalid', function() {
          expect($scope.learningQuestionForm.$invalid).toEqual(true);
        });

        it('never invokes the creation path', function() {
          expect(LearningQuestionService.createLearningQuestion).not.toHaveBeenCalled();
        });
      });
    });
  });
})();