(function() {
  'use strict';

  angular.module('PDRClient').factory('AnalysisPermission', AnalysisPermission);

  AnalysisPermission.$inject = [
    '$resource',
    'UrlService'
  ];

  function AnalysisPermission($resource, UrlService) {
    var options = {
      list: {
        method: 'GET',
        isArray: true
      },
      update: {
        method: 'PATCH',
      }
    };
    return $resource(UrlService.url('inventories/:inventory_id/analysis/permissions'), null, options);
  }
})();
