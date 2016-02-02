PDRClient.factory('Invitation', ['$resource','UrlService',
  function($resource, UrlService) {
    return $resource(UrlService.url('invitations/:token'));
  }
]);
