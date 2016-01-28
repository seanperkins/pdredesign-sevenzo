PDRClient.factory('Rubric', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('rubrics'));
}]);
