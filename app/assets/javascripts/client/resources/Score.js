PDRClient.factory('Score', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/responses/:response_id/scores/:id'), null,
    { 'save': { method: 'POST'},
    });
}]);
