(function() {
  'use strict';
  describe('Resource: LearningQuestion', function() {

    var subject, $httpBackend, $resource;

    beforeEach(module('PDRClient'));
    beforeEach(inject(function($injector) {
      subject = $injector.get('LearningQuestion');
      $resource = $injector.get('$resource');
      $httpBackend = $injector.get('$httpBackend');
    }));

    it('uses the right URL', function() {
      $httpBackend.expect('GET', '/v1/assessments/1/learning_questions').respond(200, 'success');
      subject.get({assessment_id: 1});
      $httpBackend.flush();
    });
  });
})();