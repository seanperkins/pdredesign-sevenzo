(function() {
  'use strict';
  describe('Resource: InventoryProductEntry', function() {
    var subject,
        $httpBackend,
        $resource;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$httpBackend_, _$resource_, $injector) {
        subject = $injector.get('InventoryProductEntry');
        $resource = _$resource_;
        $httpBackend = _$httpBackend_;
      });
    });

    describe('#GET', function() {
      it('uses the right URL', function() {
        $httpBackend.expect('GET', '/v1/inventories/1/product_entries').respond([]);
        subject.query({inventory_id: 1});
        expect($httpBackend.flush).not.toThrow();
      })
    });
  });
})();
