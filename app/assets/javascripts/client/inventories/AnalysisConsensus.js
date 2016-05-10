PDRClient.factory('AnalysisConsensus', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/analyses/:analysis_id/analysis_consensus/:id'), null,
      {
      	'get'	: { method: 'GET', cache: true},
        'create': { method: 'POST'},
        'submit': { method: 'PUT'},
        'pdf_report' : { url: UrlService.url('inventories/:inventory_id/analyses/:analysis_id/reports/consensus_report.pdf'), action: 'consensus_report' },
        'report': { url: UrlService.url('inventories/:inventory_id/analyses/:analysis_id/analysis_consensus/:id/consensus_report'), action: 'consensus_report' }
      });
}]);
