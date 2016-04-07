(function() {
  'use strict';

  describe('Controller: DataEntry', function() {
    var subject,
        $scope,
        $modal;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_, _$modal_) {
        $scope = _$rootScope_.$new(true);
        $modal = _$modal_;
        subject = _$controller_('DataEntryCtrl', {
          $scope: $scope,
          $modal: $modal
        });
      });
    });

    describe('#showDataEntryModal', function() {
      beforeEach(function() {
        spyOn($modal, 'open');
      });

      it('creates a modal with the right parameters', function() {
        subject.showDataEntryModal();
        expect($modal.open).toHaveBeenCalledWith({
          template: '<data-entry-modal inventory="inventory" resource="resource"></data-entry-modal>',
          scope: $scope
        });
      });
    });

    describe('$on: close-data-entry-modal', function() {
      var modalInstanceSpy = jasmine.createSpy('modalInstance');
      var $rootScope;
      beforeEach(function() {
        inject(function(_$rootScope_) {
          $rootScope = _$rootScope_;
        });
        subject.modalInstance = {dismiss: modalInstanceSpy};
      });

      it('invokes the dismiss functionality', function() {
        $rootScope.$broadcast('close-data-entry-modal');
        expect(modalInstanceSpy).toHaveBeenCalledWith('cancel');
      });
    });
  });
})();
