(function() {
  'use strict';

  describe('Controller: StartAssessmentCtrl', function() {
    var $modal,
        controller,
        SessionService,
        RecommendationTextService;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$modal_, _$controller_, $injector) {
        SessionService = $injector.get('SessionService');
        RecommendationTextService = $injector.get('RecommendationTextService');
        $modal = _$modal_;
        controller = _$controller_('StartAssessmentCtrl', {
          $modal: $modal,
          SessionService: SessionService,
          AssessmentService: RecommendationTextService
        });
      });
    });

    describe('#text', function() {
      beforeEach(function() {
        spyOn(RecommendationTextService, 'assessmentText');
        controller.text();
      });

      it('delegates to RecommendationTextService#assessmentText', function() {
        expect(RecommendationTextService.assessmentText).toHaveBeenCalled();
      });
    });

    describe('#userIsNetworkPartner', function() {
      beforeEach(function() {
        spyOn(SessionService, 'isNetworkPartner');
        controller.userIsNetworkPartner();
      });

      it('delegates to SessionService#isNetworkPartner', function() {
        expect(SessionService.isNetworkPartner).toHaveBeenCalled();
      });
    });
  });
})();
