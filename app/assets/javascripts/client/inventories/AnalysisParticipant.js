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
        url: UrlService.url('inventories/:inventory_id/analyses/:analysis_id/participants/all')
      },
      create: {
        method: 'POST'
      },
      delete: {
        method: 'DELETE',
        url: UrlService.url('inventories/:inventory_id/analyses/:analysis_id/participants/:id')
      }
    };
    return $resource(UrlService.url('inventories/:inventory_id/analyses/:analysis_id/participants'), null, methodOptions);
  }
})();
