PDRClient.factory('Organization', ['$resource', 'UrlService', function($resource, UrlService) {
  return $resource(UrlService.url('organizations/:id'), null,
    { 'create': { method: 'POST'},
      'search': { method: 'GET',
                  url: UrlService.url('organizations/search?query=:query')},
      'save'  : { method: 'PUT'},
      'get'  :  { method: 'GET'}
    }
  );
}]);
