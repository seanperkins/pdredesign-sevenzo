(function() {
  'use strict';

  describe('Controller: AnalysisModal', function() {
    var subject,
        $scope,
        Analysis,
        ConstantsService;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$rootScope_, _$controller_, $injector) {
        Analysis = $injector.get('Analysis');
        $scope = _$rootScope_.$new(true);
      });
    });

    describe('with mock request', function() {
      var $httpBackend;
      beforeEach(function() {
        inject(function(_$httpBackend_) {
          $httpBackend = _$httpBackend_;
        });
      });

      it('creates an Analysis', function() {
        inject(function(_$rootScope_, _$controller_, $injector) {
          subject = _$controller_('AnalysisModalCtrl', {
            $scope: $scope,
            Analysis: Analysis
          });
        });

        $httpBackend
            .expectPOST('/v1/inventories/42/analyses')
            .respond({});

        subject.analysis = {inventory_id: 42}
        subject.save();
        $httpBackend.flush();
      });

      it('closes the modal', function() {
        inject(function(_$rootScope_, _$controller_, $injector) {
          subject = _$controller_('AnalysisModalCtrl', {
            $scope: $scope,
            Analysis: Analysis
          });
        });

        spyOn(subject, 'closeModal');
        $httpBackend
            .expectPOST('/v1/inventories/42/analyses')
            .respond({});

        subject.analysis = {inventory_id: 42}
        subject.save();
        $httpBackend.flush();
        expect(subject.closeModal).toHaveBeenCalled();
      });
    });
  });
})();
