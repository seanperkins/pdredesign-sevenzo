(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('AnalysisMessage', AnalysisMessage);

  AnalysisMessage.$inject = [
    '$resource',
    'UrlService'
  ];

  function AnalysisMessage($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/analyses/:id/messages'));
  }
})();
