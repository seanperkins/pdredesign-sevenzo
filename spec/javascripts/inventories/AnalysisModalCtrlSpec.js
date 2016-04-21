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
            .expectPOST('/v1/inventories/42/analysis')
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
            .expectPOST('/v1/inventories/42/analysis')
            .respond({});

        subject.analysis = {inventory_id: 42}
        subject.save();
        $httpBackend.flush();
        expect(subject.closeModal).toHaveBeenCalled();
      });

      describe('handles errors', function () {
        beforeEach(function () {
          inject(function(_$rootScope_, _$controller_, $injector) {
            subject = _$controller_('AnalysisModalCtrl', {
              $scope: $scope,
              Analysis: Analysis
            });
          });

          $httpBackend
              .expectPOST('/v1/inventories/42/analysis')
              .respond(422, {errors: {foo: 'bar', wat: 'woot'}});

          subject.analysis = {inventory_id: 42}
          subject.save();
          $httpBackend.flush();
        });

        it('populates alerts', function() {
          expect(subject.alerts).toContain({type: 'danger', msg: 'foo : bar'});
        });

        it('is dismisses alerts', function() {
          expect(subject.alerts.length).toBe(2);
          subject.closeAlert(0);
          expect(subject.alerts.length).toBe(1);
        });
      });
    });
  });
})();
