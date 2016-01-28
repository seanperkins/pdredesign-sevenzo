PDRClient.factory('Category', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('categories'));
}]);
