PDRClient.factory('ProspectiveUser', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('prospective_users'));
}]);
