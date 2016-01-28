PDRClient.factory('Priority', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/priorities'));
}]);
