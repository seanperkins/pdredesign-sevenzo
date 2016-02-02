PDRClient.factory('Access', ['$resource','UrlService',
  function($resource, UrlService) {
    return $resource(UrlService.url('access/:token/:action'));
  }
]);
