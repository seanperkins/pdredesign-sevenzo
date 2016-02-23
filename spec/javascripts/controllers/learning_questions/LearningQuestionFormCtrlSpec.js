(function() {
  'use strict';
  describe('Controller: LearningQuestionFormCtrl', function() {
    var controller,
        LearningQuestion,
        $scope,
        $httpBackend;

    beforeEach(function() {
      module('PDRClient');
      inject(function($injector, $controller, $rootScope) {
        $httpBackend = $injector.get('$httpBackend');
        $scope = $rootScope.$new(true);
        LearningQuestion = $injector.get('LearningQuestion');
        controller = $controller('LearningQuestionFormCtrl', {
          $stateParams: {id: 1},
          $scope: $scope,
          LearningQuestion: LearningQuestion
        });
      });
    });

    it('emits an event on successful entity creation', function() {
      spyOn($scope, '$emit');
      $httpBackend.expect('POST',
          '/v1/assessments/1/learning_questions',
          {learning_question: {body: 'Hello there'}}).respond(201, {});

      controller.createLearningQuestion({body: 'Hello there'});
      $httpBackend.flush();

      expect($scope.$emit).toHaveBeenCalledWith('learning-question-change');
    });

    it('does not emit an event on unsuccessful entity creation', function() {
      spyOn($scope, '$emit');
      $httpBackend.expect('POST',
          '/v1/assessments/1/learning_questions',
          {learning_question: {body: 'Hello there'}}).respond(400, {});

      controller.createLearningQuestion({body: 'Hello there'});
      $httpBackend.flush();

      expect($scope.$emit).not.toHaveBeenCalledWith('learning-question-change');
    });
  });
})();