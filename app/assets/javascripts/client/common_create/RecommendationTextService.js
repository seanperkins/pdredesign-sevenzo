(function() {
  'use strict';

  angular.module('PDRClient')
      .service('RecommendationTextService', RecommendationTextService);

  RecommendationTextService.$inject = [
    'SessionService'
  ];

  function RecommendationTextService(SessionService) {
    var service = this;

    service.assessmentText = function() {
      if (SessionService.isNetworkPartner()) {
        return 'Recommend Readiness Assessment';
      } else {
        return 'Facilitate New Readiness Assessment';
      }
    };

    service.inventoryText = function() {
      if (SessionService.isNetworkPartner()) {
        return 'Recommend Data & Tech Inventory';
      } else {
        return 'Facilitate New Data & Tech Inventory';
      }
    };

    service.analysisText = function() {
      if (SessionService.isNetworkPartner()) {
        return 'Recommend Data & Tech Analysis';
      } else {
        return 'Facilitate New Data & Tech Analysis';
      }
    };
  }
})();
