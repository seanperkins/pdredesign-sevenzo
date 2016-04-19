describe('Resource: InventoryParticipant', function() {

  var subject,
      $httpBackend;

  beforeEach(function() {
    module('PDRClient');
    inject(function(InventoryParticipant, $injector) {
      subject = InventoryParticipant;
      $httpBackend = $injector.get('$httpBackend');
    });
  });

  describe('#GET (all)', function() {
    beforeEach(function() {
      $httpBackend.expectGET('/v1/inventories/1/participants/all').respond([]);
    });

    it('uses the right URL', function() {
      subject.all({inventory_id: 1});
      expect($httpBackend.flush).not.toThrow();
    });
  });

  describe('#POST (create)', function() {
    beforeEach(function() {
      $httpBackend.expectPOST('/v1/inventories/1/participants').respond(201);
    });

    it('uses the right URL', function() {
      subject.create({inventory_id: 1});
      expect($httpBackend.flush).not.toThrow();
    });
  });

  describe('#DELETE (delete)', function() {
    beforeEach(function() {
      $httpBackend.expectDELETE('/v1/inventories/1/participants/17').respond(204);
    });

    it('uses the right URL', function() {
      subject.delete({inventory_id: 1, id: 17});
      expect($httpBackend.flush).not.toThrow();
    });
  });
});
