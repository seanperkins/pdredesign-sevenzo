(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('AnalysisParticipant', AnalysisParticipant);

  AnalysisParticipant.$inject = [
    '$resource',
    'UrlService'
  ];

  function AnalysisParticipant($resource, UrlService) {
    var methodOptions = {
      all: {
        method: 'GET',
        isArray: true,
        url: UrlService.url('inventories/:inventory_id/analysis/participants/all')
      },
      create: {
        method: 'POST'
      },
      delete: {
        method: 'DELETE',
        url: UrlService.url('inventories/:inventory_id/analysis/participants/:id')
      }
    };
    return $resource(UrlService.url('inventories/:inventory_id/analysis/participants'), null, methodOptions);
  }
})();
