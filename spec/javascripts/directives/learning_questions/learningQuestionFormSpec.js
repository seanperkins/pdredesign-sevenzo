(function() {
  'use strict';
  describe('Directive: learningQuestionForm', function() {
    var element,
        $compile,
        LearningQuestion,
        $stateParams;

    beforeEach(module('PDRClient'));
    beforeEach(inject(function($rootScope, $injector) {
      $compile = $injector.get('$compile');
      $stateParams = {"id": 1};
      LearningQuestion = $injector.get('LearningQuestion');
      element = angular.element('<div><learning-question-form /></div>');
      $compile(element)($rootScope);
      $rootScope.$digest();
    }));

    it('creates the form', function() {
      expect(element.find('form').length).toEqual(1);
    });
  });
})();