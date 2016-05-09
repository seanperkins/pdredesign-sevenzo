(function() {
  'use strict';
  angular.module('PDRClient')
      .factory('AnalysisLearningQuestion', analysisLearningQuestionFactory);

  analysisLearningQuestionFactory.$inject = [
    '$resource',
    'UrlService'
  ];

  function analysisLearningQuestionFactory($resource, UrlService) {
    var methodOptions = {
      'create': {
        method: 'POST'
      },
      'update': {
        method: 'PATCH',
        params: {
          id: '@id',
          inventory_id: '@inventory_id',
          analysis_id: '@analysis_id'
        }
      },
      'exists': {
        method: 'GET',
        url: UrlService.url('inventories/:inventory_id/analyses/:analysis_id/learning_questions/exists'),
        params: {
          inventory_id: '@inventory_id',
          analysis_id: '@analysis_id'
        }
      }
    };
    return $resource(UrlService.url('inventories/:inventory_id/analyses/:analysis_id/learning_questions/:id'), null, methodOptions);
  }
})();
