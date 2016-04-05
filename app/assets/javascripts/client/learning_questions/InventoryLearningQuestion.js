(function() {
  'use strict';
  angular.module('PDRClient')
      .factory('InventoryLearningQuestion', ['$resource', 'UrlService', inventoryLearningQuestionFactory]);

  function inventoryLearningQuestionFactory($resource, UrlService) {
    var methodOptions = {
      'create': {
        method: 'POST'
      },
      'update': {
        method: 'PATCH',
        params: {
          id: '@id',
          inventory_id: '@inventory_id'
        }
      },
      'exists': {
        method: 'GET',
        url: UrlService.url('inventories/:inventory_id/learning_questions/exists'),
        params: {
          inventory_id: '@inventory_id'
        }
      }
    };
    return $resource(UrlService.url('inventories/:inventory_id/learning_questions/:id'), null, methodOptions);
  }
})();