(function() {
  'use strict';

  angular.module('PDRClient')
      .service('ResponseValidationService', ResponseValidationService);

  function ResponseValidationService() {
    this.invalidEvidence = function(question, blankable) {
      return blankable === 'false' && (question.score.evidence === null || question.score.evidence === '');
    }
  }
})();