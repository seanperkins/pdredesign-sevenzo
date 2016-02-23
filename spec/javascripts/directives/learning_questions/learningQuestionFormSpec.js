(function () {
  'use strict';
  xdescribe('Directive: learningQuestionForm', function () {
    var element,
        $scope,
        $compile,
        LearningQuestion,
        $stateParams,
        isolatedScope;

    beforeEach(module('PDRClient'));
    beforeEach(inject(function($rootScope, $injector) {
      $compile = $injector.get('$compile');
      $stateParams = {"id": 1};
      LearningQuestion = $injector.get('LearningQuestion');
      $scope = $rootScope.$new(true);
      element = angular.element('<learning-question-form />');

      $compile(element)($scope);
      $scope.$digest();

      isolatedScope = element.isolateScope();
    }));

    describe('when creating a new entry', function() {
      beforeEach(function() {
        this.view.render();
        spyOn(LearningQuestion, 'create');
        isolatedScope.createLearningQuestion({"body": "this is a test!"});
      });
      it('invokes creation of a new entity', function() {
        expect(LearningQuestion.create).toHaveBeenCalledWith({"assessment_id": 1});
      });
    });
  });
})();