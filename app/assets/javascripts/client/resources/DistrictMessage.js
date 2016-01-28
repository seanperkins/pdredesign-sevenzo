PDRClient.factory('DistrictMessage', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('district_messages'));
}]);
