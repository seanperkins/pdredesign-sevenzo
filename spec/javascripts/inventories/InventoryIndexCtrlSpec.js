(function() {
  'use strict';

  describe('Controller: InventoryIndex', function() {
    var controller, SessionService;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_, _SessionService_) {
        var scope = _$rootScope_.$new(true);
        controller = _$controller_('InventoryIndexCtrl', {
          $scope: scope,
          inventories: {
            inventories: [1, 2, 3]
          }
        });
        SessionService = _SessionService_;
      });
    });

    it('binds inventories to the view model', function() {
      expect(controller.inventories).toEqual({inventories: [1, 2, 3]});
    });
  });
})();