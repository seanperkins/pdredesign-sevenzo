(function() {
  'use strict';

  describe('Controller: InventoryDataEntry', function() {
    var subject,
        $scope,
        $modal;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_, _$modal_) {
        $scope = _$rootScope_.$new(true);
        $modal = _$modal_;
        subject = _$controller_('InventoryDataEntryCtrl', {
          $scope: $scope,
          $modal: $modal
        });
      });
    });

    describe('#showInventoryDataEntryModal', function() {
      beforeEach(function() {
        spyOn($modal, 'open');
      });

      it('creates a modal with the right parameters', function() {
        subject.showInventoryDataEntryModal();
        expect($modal.open).toHaveBeenCalledWith({
          template: '<inventory-data-entry-modal inventory="inventory" resource="resource"></inventory-data-entry-modal>',
          scope: $scope
        });
      });
    });

    describe('$on: close-inventory-data-entry-modal', function() {
      var modalInstanceSpy = jasmine.createSpy('modalInstance');
      var $rootScope;
      beforeEach(function() {
        inject(function(_$rootScope_) {
          $rootScope = _$rootScope_;
        });
        subject.modalInstance = {dismiss: modalInstanceSpy};
      });

      it('invokes the dismiss functionality', function() {
        $rootScope.$broadcast('close-inventory-data-entry-modal');
        expect(modalInstanceSpy).toHaveBeenCalledWith('cancel');
      });
    });
  });
})();
