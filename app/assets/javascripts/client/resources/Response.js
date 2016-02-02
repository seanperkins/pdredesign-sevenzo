PDRClient.factory('Response', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/responses/:id'), null, {
      'submit': { method: 'PUT'},
    });
}]);
