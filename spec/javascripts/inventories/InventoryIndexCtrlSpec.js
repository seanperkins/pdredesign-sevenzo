(function() {
  'use strict';

  describe('Controller: InventoryIndex', function() {
    var controller;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_) {
        var scope = _$rootScope_.$new(true);
        controller = _$controller_('InventoryIndexCtrl', {
          $scope: scope,
          inventory_result: [1, 2, 3]
        });
      });
    });

    it('binds inventories to the view model', function() {
      expect(controller.inventories).toEqual([1, 2, 3]);
    });
  });
})();
