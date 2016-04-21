(function() {
  'use strict';

  describe('Controller: AnalysisButton', function() {
    var subject,
        $scope,
        $modal;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_, _$modal_) {
        $scope = _$rootScope_.$new(true);
        $modal = _$modal_;
        subject = _$controller_('AnalysisButtonCtrl', {
          $scope: $scope,
          $modal: $modal
        });
      });
    });

    describe('#showAnalysisModal', function() {
      beforeEach(function() {
        spyOn($modal, 'open');
      });

      it('creates a modal with the right parameters', function() {
        subject.showAnalysisModal();
        expect($modal.open).toHaveBeenCalledWith({
          template: '<analysis-modal></analysis-modal>',
          scope: $scope
        });
      });
    });

    describe('$on: close-analysis-modal', function() {
      var modalInstanceSpy = jasmine.createSpy('modalInstance');
      var $rootScope;
      beforeEach(function() {
        inject(function(_$rootScope_) {
          $rootScope = _$rootScope_;
        });
        subject.modalInstance = {dismiss: modalInstanceSpy};
      });

      it('invokes the dismiss functionality', function() {
        $rootScope.$broadcast('close-analysis-modal');
        expect(modalInstanceSpy).toHaveBeenCalledWith('cancel');
      });
    });
  });
})();
