(function() {
  'use strict';
  describe('Resource: InventoryLearningQuestion', function() {

    var subject, $httpBackend, $resource;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$resource_, _$httpBackend_, $injector) {
        $resource = _$resource_;
        $httpBackend = _$httpBackend_;

        subject = $injector.get('InventoryLearningQuestion');
      });
    });

    describe('#GET (all)', function() {
      it('uses the right URL', function() {
        $httpBackend.expectGET('/v1/inventories/1/learning_questions').respond({learning_questions: []});
        subject.get({inventory_id: 1});
        $httpBackend.flush();
      });
    });

    describe('#GET (individual)', function() {
      it('uses the right URL', function() {
        $httpBackend.expectGET('/v1/inventories/1/learning_questions/3').respond({learning_question: {}});
        subject.get({inventory_id: 1, id: 3});
        $httpBackend.flush();
      });
    });

    describe('#GET (exists)', function() {
      it('uses the right URL', function() {
        $httpBackend.expectGET('/v1/inventories/1/learning_questions/exists').respond({200: {}});
        subject.exists({inventory_id: 1});
        $httpBackend.flush();
      });
    });

    describe('#POST', function() {
      it('uses the right URL', function() {
        $httpBackend.expectPOST('/v1/inventories/1/learning_questions').respond(201);
        subject.create({inventory_id: 1}, {learning_question: {body: 'Hello!'}});
        $httpBackend.flush();
      })
    });

    describe('#PATCH', function() {
      it('uses the right URL', function() {
        $httpBackend.expectPATCH('/v1/inventories/1/learning_questions/3').respond(204);
        subject.update({inventory_id: 1, id: 3}, {learning_question: {body: 'Hi!'}});
        $httpBackend.flush();
      })
    });

    describe('#DELETE', function() {
      it('uses the right url', function() {
        $httpBackend.expectDELETE('/v1/inventories/1/learning_questions/3').respond(201);
        subject.delete({inventory_id: 1, id: 3});
        $httpBackend.flush();
      })
    })
  });
})();