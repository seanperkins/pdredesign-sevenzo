(function() {
  'use strict';
  angular.module('PDRClient').factory('AnalysisInvitation', AnalysisInvitation);
  AnalysisInvitation.$inject = ['$resource', 'UrlService'];

  function AnalysisInvitation($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/analysis/invitations'), null,{
      create: {
        method: 'POST',
      }
    });
  }
})();
