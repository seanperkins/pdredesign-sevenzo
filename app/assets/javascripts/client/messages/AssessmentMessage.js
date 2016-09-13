(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('AssessmentMessage', AssessmentMessage);

  AssessmentMessage.$inject = [
    '$resource',
    'UrlService'
  ];

  function AssessmentMessage($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/messages'));
  }
})();
