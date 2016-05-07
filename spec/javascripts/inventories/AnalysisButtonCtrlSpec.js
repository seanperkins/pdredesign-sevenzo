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
      var tester = {
        asymmetricMatch: function(actual) {
          return actual.templateUrl === 'client/analyses/analysis_modal.html'
              && actual.controller === 'AnalysisModalCtrl'
              && actual.controllerAs === 'analysisModal'
              && actual.resolve.preSelectedInventory() === null
        }
      };

      beforeEach(function() {
        spyOn($modal, 'open');
      });

      it('creates a modal with the right parameters', function() {
        subject.showAnalysisModal();
        expect($modal.open).toHaveBeenCalledWith(tester);
      });
    });
  });
})();
