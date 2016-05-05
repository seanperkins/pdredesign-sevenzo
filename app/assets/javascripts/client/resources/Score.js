(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('Score', Score);

  Score.$inject = [
    '$resource',
    'UrlService'
  ];

  function Score($resource, UrlService) {
    var methodOptions = {
      'save': {
        method: 'POST'
      }
    };
    return $resource(UrlService.url('assessments/:assessment_id/responses/:response_id/scores/:id'),
        null,
        methodOptions);
  }
})();

