(function() {
  'use strict';

  describe('Controller: ProductEntry', function() {
    var subject,
        $scope,
        $modal;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_, _$modal_) {
        $scope = _$rootScope_.$new(true);
        $modal = _$modal_;
        subject = _$controller_('ProductEntryCtrl', {
          $scope: $scope,
          $modal: $modal
        });
      });
    });

    describe('#showProductEntryModal', function() {
      beforeEach(function() {
        spyOn($modal, 'open');
      });

      it('creates a modal with the right parameters', function() {
        subject.showProductEntryModal();
        expect($modal.open).toHaveBeenCalledWith({
          template: '<product-entry-modal inventory="inventory" resource="resource"></product-entry-modal>',
          scope: $scope
        });
      });
    });

    describe('$on: close-product-entry-modal', function() {
      var modalInstanceSpy = jasmine.createSpy('modalInstance');
      var $rootScope;
      beforeEach(function() {
        inject(function(_$rootScope_) {
          $rootScope = _$rootScope_;
        });
        subject.modalInstance = {dismiss: modalInstanceSpy};
      });

      it('invokes the dismiss functionality', function() {
        $rootScope.$broadcast('close-product-entry-modal');
        expect(modalInstanceSpy).toHaveBeenCalledWith('cancel');
      });
    });
  });
})();
