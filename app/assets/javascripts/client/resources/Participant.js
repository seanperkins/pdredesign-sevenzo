PDRClient.factory('Participant', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/participants'), null,{
      all: {
        method: 'GET',
        isArray: true,
        url: UrlService.url('assessments/:assessment_id/participants/all')
      },
      delete: {
        method: 'DELETE',
        url: UrlService.url('assessments/:assessment_id/participants/:id')
      },
      consensus_report: {
        method: 'GET',
        url: UrlService.url('assessments/:assessment_id/consensus/:consensu_id/participants/:participant_id/report')
      }
    });
}]);
