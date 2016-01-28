PDRClient.factory('Tool', ['$resource','UrlService', function($resource,UrlService) {
    return $resource(UrlService.url('tools/:id'), null,
      {
        'create': { method: 'POST'}
      }
    );
}]);
