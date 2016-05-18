(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('AnalysisReport', AnalysisReport);

  AnalysisReport.$inject = [
    '$resource',
    'UrlService'
  ];

  function AnalysisReport($resource, UrlService) {
    var methodOptions = {
      'comparisonData': {
        method: 'GET',
        url: UrlService.url('inventories/:inventory_id/analyses/:id/comparison_data'),
        isArray: true
      }
    };

    return $resource(UrlService.url('inventories/:inventory_id/analyses/:id'), null, methodOptions);
  }
})();