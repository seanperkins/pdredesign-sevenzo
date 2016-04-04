describe('Resource: InventoryAccessRequest', function() {
  var subject, scope, $httpBackend;

  beforeEach(function() {
    module('PDRClient');
    inject(function($resource, $rootScope, InventoryAccessRequest, $injector) {
      scope = $rootScope.$new();
      subject = InventoryAccessRequest;
      $httpBackend = $injector.get('$httpBackend');
    });
  });

  it("updates access request", function(){
    $httpBackend.expectPATCH('/v1/inventories/10/access_requests', { status: 'denied' }).respond(200, {});
    subject.update({
      inventory_id: 10
    }, {
      status: 'denied'
    });
    $httpBackend.flush();
  });

  it("list fetches all access requests for inventory", function(){
    $httpBackend.expectGET('/v1/inventories/10/access_requests').respond(200, []);
    subject.list({
      inventory_id: 10
    });
    $httpBackend.flush();
  });
});
