(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('AssessmentReminder', AssessmentReminder);

  AssessmentReminder.$inject = [
    '$resource',
    'UrlService'
  ];

  function AssessmentReminder($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/reminders'));
  }
})();
