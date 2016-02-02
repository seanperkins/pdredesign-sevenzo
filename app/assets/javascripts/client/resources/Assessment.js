PDRClient.factory('Assessment', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:id'), null,
    { 'save':   { method: 'PUT'},
      'update': { method: 'PUT', isArray: false },
      'create': { method: 'POST'},
    });
}]);
