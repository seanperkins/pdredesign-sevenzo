(function() {
  'use strict';

  describe('Controller: LearningQuestionDisplay', function() {
    var controller,
        LearningQuestion,
        $scope,
        $window,
        $httpBackend;

    beforeEach(function() {
      module('PDRClient');
      inject(function($injector, $controller, $rootScope) {
        LearningQuestion = $injector.get('LearningQuestion');
        $scope = $rootScope.$new(true);
        $httpBackend = $injector.get('$httpBackend');
        $window = $injector.get('$window');

        controller = $controller('LearningQuestionDisplayCtrl', {
          $scope: $scope,
          $stateParams: {id: 1},
          LearningQuestion: LearningQuestion,
          $window: $window
        });
      });
    });

    it('loads questions in at controller instantiation', function() {
      $httpBackend.expect('GET', '/v1/assessments/1/learning_questions').respond(200, {
        learning_questions: [
          {
            id: 1,
            editable: true,
            body: 'Hello world!'
          }
        ]
      });

      $httpBackend.flush();
      expect(controller.learningQuestions.length).toEqual(1);
    });

    it('loads questions in at controller instantiation', function() {
      $httpBackend.expect('GET', '/v1/assessments/1/learning_questions').respond(200, {
        learning_questions: [
          {
            id: 1,
            editable: true,
            body: 'Hello world!'
          }
        ]
      });

      $httpBackend.flush();
      expect(controller.learningQuestions.length).toEqual(1);
    });

    it('does not emit a change event if the user does not delete the entity', function() {
      $httpBackend.expect('GET', '/v1/assessments/1/learning_questions').respond(200, {
        learning_questions: [
          {
            id: 1,
            editable: true,
            body: 'Hello world!'
          }
        ]
      });
      var invoked = false;
      spyOn($window, 'confirm').and.returnValue(false);
      $httpBackend.when('DELETE', '/v1/assessments/1/learning_questions/1').respond(function() {
        invoked = true;
        return {400: []};
      });
      controller.deleteLearningQuestion({id: 1});

      $httpBackend.flush();
      expect(invoked).toBe(false);
    });
  });

})();