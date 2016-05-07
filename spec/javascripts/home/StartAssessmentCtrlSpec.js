(function() {
  'use strict';

  describe('Controller: StartAssessmentCtrl', function() {
    var $modal,
        controller,
        AssessmentService,
        SessionService;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$modal_, _$controller_, $injector) {
        SessionService = $injector.get('SessionService');
        AssessmentService = $injector.get('AssessmentService');
        $modal = _$modal_;
        controller = _$controller_('StartAssessmentCtrl', {
          $modal: $modal,
          SessionService: SessionService,
          AssessmentService: AssessmentService
        });
      });
    });

    describe('#text', function() {
      beforeEach(function() {
        spyOn(AssessmentService, 'text');
        controller.text();
      });

      it('delegates to AssessmentService#text', function() {
        expect(AssessmentService.text).toHaveBeenCalled();
      });
    });

    describe('#userIsNetworkPartner', function() {
      beforeEach(function() {
        spyOn(AssessmentService, 'userIsNetworkPartner');
        controller.userIsNetworkPartner();
      });

      it('delegates to AssessmentService.userIsNetworkPartner', function() {
        expect(AssessmentService.userIsNetworkPartner).toHaveBeenCalled();
      });
    });
  });
})();
