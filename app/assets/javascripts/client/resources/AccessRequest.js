PDRClient.factory('AccessRequest', ['$resource','UrlService',
  function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/access_request'));
  }
]);
