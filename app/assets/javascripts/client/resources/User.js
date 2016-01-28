PDRClient.factory('User', ['$resource', 'UrlService', function($resource, UrlService) {
  return $resource(UrlService.url('user'), null,
    { 'create': { method: 'POST'}
    , 'save':   { method: 'PUT'} });
}]);
