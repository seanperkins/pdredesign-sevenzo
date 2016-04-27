(function() {
  'use strict';
  describe('Resource: Analysis', function() {
    var subject,
        $httpBackend;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$httpBackend_, _$resource_, $injector) {
        subject = $injector.get('Analysis');
        $httpBackend = _$httpBackend_;
      });
    });

    describe('#create', function() {
      it('uses the right URL', function() {
        $httpBackend.expect('POST', '/v1/inventories/42/analyses').respond({inventories: []});
        subject.create(null, {inventory_id: 42});
        expect($httpBackend.flush).not.toThrow();
      })
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
    })
  });
})();
