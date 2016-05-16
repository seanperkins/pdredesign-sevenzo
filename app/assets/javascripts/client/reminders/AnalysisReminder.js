(function() {
  'use strict';

  angular.module('PDRClient')
      .factory('AnalysisReminder', AnalysisReminder);

  AnalysisReminder.$inject = [
    '$resource',
    'UrlService'
  ];

  function AnalysisReminder($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/analyses/:id/reminders'));
  }
})();
