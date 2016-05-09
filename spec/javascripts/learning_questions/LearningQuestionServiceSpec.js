(function() {
  'use strict';

  describe('Service: LearningQuestion', function() {
    var subject;

    describe('#extractId', function() {
      var result;

      describe('when $stateParams contains assessment_id', function() {
        var $stateParams;
        beforeEach(function() {
          module('PDRClient', function($provide) {
            $provide.value('$stateParams', {assessment_id: 1721});
          });

          inject(function(_LearningQuestionService_) {
            subject = _LearningQuestionService_;
          });

          result = subject.extractId();
        });

        it('returns the correct ID', function() {
          expect(result).toEqual(1721);
        });
      });

      describe('when $stateParams contains inventory_id', function() {
        beforeEach(function() {
          module('PDRClient', function($provide) {
            $provide.value('$stateParams', {inventory_id: 301});
          });

          inject(function(_LearningQuestionService_) {
            subject = _LearningQuestionService_;
          });

          result = subject.extractId();
        });

        it('returns the correct ID', function() {
          expect(result).toEqual(301);
        });
      });

      describe('when $stateParams contains id', function() {
        beforeEach(function() {
          module('PDRClient', function($provide) {
            $provide.value('$stateParams', {id: 17});
          });

          inject(function(_LearningQuestionService_) {
            subject = _LearningQuestionService_;
          });

          result = subject.extractId();
        });

        it('returns the correct ID', function() {
          expect(result).toEqual(17);
        });
      });
    });

    describe('#setContext', function() {
      beforeEach(function() {
        module('PDRClient');
        inject(function(_LearningQuestionService_) {
          subject = _LearningQuestionService_;
        });

        subject.setContext('testContextOmega');
      });

      it('sets the context to what is provided', function() {
        expect(subject.context).toEqual('testContextOmega');
      });
    });

    describe('#validate', function() {
      beforeEach(function() {
        module('PDRClient');
        inject(function(_LearningQuestionService_) {
          subject = _LearningQuestionService_;
        });
      });

      describe('with empty data', function() {
        var undefinedData = undefined;
        var blankData = '';

        it('rejects undefined data with the correct response', function() {
          expect(subject.validate(undefinedData)).toEqual('Questions may not be empty.');
        });

        it('rejects blank data with the correct response', function() {
          expect(subject.validate(blankData)).toEqual('Questions may not be empty.');
        });
      });

      describe('with overly long data', function() {
        var lipsum256 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vestibulum tincidunt tempus. Fusce a commodo tellus. Sed vehicula est et accumsan auctor. Suspendisse posuere pulvinar consectetur. Suspendisse vehicula, metus eget tempor ullamcorper posuere.';

        it('rejects with the correct response', function() {
          expect(subject.validate(lipsum256)).toEqual('You may not create a question that exceeds 255 characters in length.');
        });
      });
    });

    describe('#performGetByContext', function() {
      describe('when the context is set to "assessment"', function() {
        var AssessmentLearningQuestion,
            $q,
            $rootScope;
        beforeEach(function() {
          module('PDRClient', function($provide) {
            $provide.value('$stateParams', {id: 87});
          });
          inject(function(_$q_, _$rootScope_, _AssessmentLearningQuestion_, _LearningQuestionService_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            AssessmentLearningQuestion = _AssessmentLearningQuestion_;
            subject = _LearningQuestionService_;
          });

          subject.context = 'assessment';
          spyOn(AssessmentLearningQuestion, 'get').and.returnValue($q.when({}));

          subject.performGetByContext();
          $rootScope.$apply();
        });

        it('invokes AssessmentLearningQuestion#get', function() {
          expect(AssessmentLearningQuestion.get).toHaveBeenCalledWith({assessment_id: 87});
        });
      });

      describe('when the context is set to "inventory"', function() {
        var InventoryLearningQuestion,
            $q,
            $rootScope;
        beforeEach(function() {
          module('PDRClient', function($provide) {
            $provide.value('$stateParams', {id: 123});
          });
          inject(function(_$q_, _$rootScope_, _InventoryLearningQuestion_, _LearningQuestionService_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            InventoryLearningQuestion = _InventoryLearningQuestion_;
            subject = _LearningQuestionService_;
          });

          subject.context = 'inventory';
          spyOn(InventoryLearningQuestion, 'get').and.returnValue($q.when({}));

          subject.performGetByContext();
          $rootScope.$apply();
        });

        it('invokes InventoryLearningQuestion#get', function() {
          expect(InventoryLearningQuestion.get).toHaveBeenCalledWith({inventory_id: 123});
        });
      });
    });

    describe('#performDeleteByContext', function() {
      describe('when the context is set to "assessment"', function() {
        var AssessmentLearningQuestion,
            $q,
            $rootScope;

        var model = {id: 17};

        beforeEach(function() {
          module('PDRClient', function($provide) {
            $provide.value('$stateParams', {id: 87});
          });
          inject(function(_$q_, _$rootScope_, _AssessmentLearningQuestion_, _LearningQuestionService_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            AssessmentLearningQuestion = _AssessmentLearningQuestion_;
            subject = _LearningQuestionService_;
          });

          subject.context = 'assessment';
          spyOn(AssessmentLearningQuestion, 'delete').and.returnValue($q.when({}));

          subject.performDeleteByContext(model);
          $rootScope.$apply();
        });

        it('invokes AssessmentLearningQuestion#delete', function() {
          expect(AssessmentLearningQuestion.delete).toHaveBeenCalledWith({assessment_id: 87, id: 17});
        });
      });

      describe('when the context is set to "inventory"', function() {
        var InventoryLearningQuestion,
            $q,
            $rootScope;

        var model = {id: 3215};

        beforeEach(function() {
          module('PDRClient', function($provide) {
            $provide.value('$stateParams', {id: 123});
          });
          inject(function(_$q_, _$rootScope_, _InventoryLearningQuestion_, _LearningQuestionService_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            InventoryLearningQuestion = _InventoryLearningQuestion_;
            subject = _LearningQuestionService_;
          });

          subject.context = 'inventory';
          spyOn(InventoryLearningQuestion, 'delete').and.returnValue($q.when({}));

          subject.performDeleteByContext(model);
          $rootScope.$apply();
        });

        it('invokes InventoryLearningQuestion#delete', function() {
          expect(InventoryLearningQuestion.delete).toHaveBeenCalledWith({inventory_id: 123, id: 3215});
        });
      });
    });

    describe('#performUpdateByContext', function() {
      describe('when the context is set to "assessment"', function() {
        var AssessmentLearningQuestion,
            $q,
            $rootScope;

        var model = {id: 17, body: 'This is changing things'};

        beforeEach(function() {
          module('PDRClient', function($provide) {
            $provide.value('$stateParams', {id: 87});
          });
          inject(function(_$q_, _$rootScope_, _AssessmentLearningQuestion_, _LearningQuestionService_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            AssessmentLearningQuestion = _AssessmentLearningQuestion_;
            subject = _LearningQuestionService_;
          });

          subject.context = 'assessment';
          spyOn(AssessmentLearningQuestion, 'update').and.returnValue($q.when({}));

          subject.performUpdateByContext(model);
          $rootScope.$apply();
        });

        it('invokes AssessmentLearningQuestion#update', function() {
          expect(AssessmentLearningQuestion.update).toHaveBeenCalledWith({
            assessment_id: 87,
            id: 17,
            learning_question: {
              body: 'This is changing things'
            }
          });
        });
      });

      describe('when the context is set to "inventory"', function() {
        var InventoryLearningQuestion,
            $q,
            $rootScope;

        var model = {id: 3215, body: 'Whoa, still moving around'};

        beforeEach(function() {
          module('PDRClient', function($provide) {
            $provide.value('$stateParams', {id: 123});
          });
          inject(function(_$q_, _$rootScope_, _InventoryLearningQuestion_, _LearningQuestionService_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            InventoryLearningQuestion = _InventoryLearningQuestion_;
            subject = _LearningQuestionService_;
          });

          subject.context = 'inventory';
          spyOn(InventoryLearningQuestion, 'update').and.returnValue($q.when({}));

          subject.performUpdateByContext(model);
          $rootScope.$apply();
        });

        it('invokes InventoryLearningQuestion#update', function() {
          expect(InventoryLearningQuestion.update).toHaveBeenCalledWith({
            inventory_id: 123,
            id: 3215,
            learning_question: {
              body: 'Whoa, still moving around'
            }
          });
        });
      });
    });

    describe('#performCreateByContext', function() {
      describe('when the context is set to "assessment"', function() {
        var AssessmentLearningQuestion,
            $q,
            $rootScope;

        var model = {body: 'A whole new world!!!'};

        beforeEach(function() {
          module('PDRClient', function($provide) {
            $provide.value('$stateParams', {id: 87});
          });
          inject(function(_$q_, _$rootScope_, _AssessmentLearningQuestion_, _LearningQuestionService_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            AssessmentLearningQuestion = _AssessmentLearningQuestion_;
            subject = _LearningQuestionService_;
          });

          subject.context = 'assessment';
          spyOn(AssessmentLearningQuestion, 'create').and.returnValue($q.when({}));

          subject.performCreateByContext(model);
          $rootScope.$apply();
        });

        it('invokes AssessmentLearningQuestion#create', function() {
          expect(AssessmentLearningQuestion.create).toHaveBeenCalledWith({
                assessment_id: 87
              },
              {
                learning_question: {
                  body: 'A whole new world!!!'
                }
              });
        });
      });

      describe('when the context is set to "inventory"', function() {
        var InventoryLearningQuestion,
            $q,
            $rootScope;

        var model = {body: 'Hurry, hurry, hurry, hurry!'};

        beforeEach(function() {
          module('PDRClient', function($provide) {
            $provide.value('$stateParams', {id: 123});
          });
          inject(function(_$q_, _$rootScope_, _InventoryLearningQuestion_, _LearningQuestionService_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            InventoryLearningQuestion = _InventoryLearningQuestion_;
            subject = _LearningQuestionService_;
          });

          subject.context = 'inventory';
          spyOn(InventoryLearningQuestion, 'create').and.returnValue($q.when({}));

          subject.performCreateByContext(model);
          $rootScope.$apply();
        });

        it('invokes InventoryLearningQuestion#create', function() {
          expect(InventoryLearningQuestion.create).toHaveBeenCalledWith({
                inventory_id: 123
              },
              {
                learning_question: {
                  body: 'Hurry, hurry, hurry, hurry!'
                }
              });
        });
      });
    });

    describe('#loadQuestions', function() {
      var $rootScope,
          $q;

      beforeEach(function() {
        module('PDRClient');
        inject(function(_$q_, _$rootScope_, _LearningQuestionService_) {
          $q = _$q_;
          $rootScope = _$rootScope_;
          subject = _LearningQuestionService_;
        });
      });

      describe('when the load is successful', function() {
        beforeEach(function() {
          spyOn(subject, 'performGetByContext').and.returnValue($q.when([1, 2, 3]));

          subject.loadQuestions();
          $rootScope.$apply();
        });

        it('broadcasts the result', function() {
          $rootScope.$on('learning-questions-updated', function(val) {
            expect(val).toEqual([1, 2, 3]);
          });
        });
      });

      describe('when the load is unsuccessful', function() {
        var broadcastSpy = jasmine.createSpy('broadcastSpy');
        beforeEach(function() {
          spyOn(subject, 'performGetByContext').and.returnValue($q.reject('nope'));
          $rootScope.$on('learning-questions-updated', broadcastSpy);

          subject.loadQuestions();
          $rootScope.$apply();
        });

        it('does not broadcast the result', function() {
          expect(broadcastSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('#deleteLearningQuestion', function() {
      beforeEach(function() {
        module('PDRClient');
        inject(function(_LearningQuestionService_) {
          subject = _LearningQuestionService_;
        });

        spyOn(subject, 'performDeleteByContext');
        subject.deleteLearningQuestion({id: 1});
      });

      it('delegates to #performDeleteByContext', function() {
        expect(subject.performDeleteByContext).toHaveBeenCalledWith({id: 1});
      });
    });

    describe('updateLearningQuestion', function() {
      beforeEach(function() {
        module('PDRClient');
        inject(function(_LearningQuestionService_) {
          subject = _LearningQuestionService_;
        });

        spyOn(subject, 'performUpdateByContext');
        subject.updateLearningQuestion({id: 1, body: 'Foo!!!'});
      });

      it('delegates to #performUpdateByContext', function() {
        expect(subject.performUpdateByContext).toHaveBeenCalledWith({id: 1, body: 'Foo!!!'});
      });
    });

    describe('#createLearningQuestion', function() {
      beforeEach(function() {
        module('PDRClient');
        inject(function(_LearningQuestionService_) {
          subject = _LearningQuestionService_;
        });

        spyOn(subject, 'performCreateByContext');
        subject.createLearningQuestion({body: 'new kid on the block'});
      });

      it('delegates to #performCreateByContext', function() {
        expect(subject.performCreateByContext).toHaveBeenCalledWith({body: 'new kid on the block'});
      });
    });
  });
})();