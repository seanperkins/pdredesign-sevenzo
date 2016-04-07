(function() {
  'use strict';
  describe('Resource: Inventory', function() {
    var subject,
        $httpBackend,
        $resource;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$httpBackend_, _$resource_, $injector) {
        subject = $injector.get('Inventory');
        $resource = _$resource_;
        $httpBackend = _$httpBackend_;
      });
    });

    describe('#get', function() {
      it('uses the right URL', function() {
        $httpBackend.expect('GET', '/v1/inventories').respond({inventories: []});
        subject.get();
        expect($httpBackend.flush).not.toThrow();
      })
    });

    describe('#create', function() {
      it('uses the right URL', function() {
        $httpBackend.expect('POST', '/v1/inventories').respond({200: {}});
        subject.create();
        expect($httpBackend.flush).not.toThrow();
      });
    });

    describe('#save', function() {
      it('uses the right URL', function() {
        $httpBackend.expect('PUT', '/v1/inventories').respond({204: {}});
        subject.save();
        expect($httpBackend.flush).not.toThrow();
      });
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
    })
  });
})();
