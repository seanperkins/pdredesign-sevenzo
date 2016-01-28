PDRClient.factory('Consensus', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/consensus/:id'), null,
      {
      	'get'	: { method: 'GET', cache: true},
        'create': { method: 'POST'},
        'submit': { method: 'PUT'},
        'pdf_report' : { url: UrlService.url('assessments/:assessment_id/reports/consensus_report.pdf'), action: 'consensus_report' },
        'report': { url: UrlService.url('assessments/:assessment_id/consensus/:id/consensus_report'), action: 'consensus_report' }
      });
}]);
